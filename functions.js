const scriptUrl = 'https://script.google.com/macros/s/AKfycbxLewraHFsxim_y-KJ66K4unZYGY5CH4QD1QUnEy2g0_BkBk_fsAVoQhrWoKBpBYubv/exec';
let dataOnSite;

function showAllAnime() {
    fetch(scriptUrl)//
            .then(res => res.json())
            .then(data => {
                // Получаем данные
                dataOnSite = data;
                addGotData(data);
            })
}
function addGotData(data) 
{
    listOfAnime.innerHTML = "";

    data.forEach((row) => {
        listOfAnime.innerHTML += "<li class='listOfAnime-li'>\n" +
        "<div class='anime'>\n" +
        "<img src='" + row.picture +"' alt='"+ row.name +"' class='AnimePicture'>\n" +
        "<div class='div-anime-grade'><img src='Media/Images/star.png' width='20px' height='20px'><p>" + row.summaryGrade + "</p></div>" +
        "<div class='anime-information'>\n" +
        "<p class='anime-name'>"+ row.name+ "</p>\n" +
        "<p class='anime-description'>"+ row.description+ "</p>\n" +
        "<div class='line_under'></div>\n" +
        "<p class='p-anime-grade'> Сюжет: "+ row.gradePlot+ "/10.</p>\n" +
        "<p class='p-anime-grade'> Анимация: "+ row.gradeAnimations+ "/10.</p>\n" +
        "<p class='p-anime-grade'> Звук: "+ row.gradeSound+ "/10.</p>\n" +
        "<p class='p-anime-grade'> Персонажи: "+ row.gradeCharacters+ "/10.</p>\n" +
        "</div>\n"+
        "<\li>"
    })
}
function postData()
{
const formData = new FormData();
const inputName = document.getElementById("inputName");
const inputPicture = document.getElementById("inputPicture");
const inputDescription = document.getElementById("inputDescription");
const inputGradePlot = document.getElementById("inputGradePlot");
const inputGradeAnimation = document.getElementById("inputGradeAnimation");
const inputGradeSound = document.getElementById("inputGradeSound");
const inputGradeCharacters = document.getElementById("inputGradeCharacters");
formData.append('operation', 'addAnime');
formData.append('name', inputName.value);
formData.append('pictureURL', inputPicture.value);
formData.append('description', inputDescription.value);
formData.append('gradePlot', inputGradePlot.value);
formData.append('gradeAnimation', inputGradeAnimation.value);
formData.append('gradeSound', inputGradeSound.value);
formData.append('gradeCharacters', inputGradeCharacters.value);
fetch(scriptUrl, {
    method: 'POST', body: formData
})
    .then(res => res.json())
    .then(data => {location.reload();})
}
function authorization(){
    const formData = new FormData();
    const inputPassword = document.getElementById("inputPassword");
    formData.append('operation', 'authorization');
    formData.append('password', inputPassword.value);
    fetch(scriptUrl, {
        method: 'POST', body: formData
    })
        .then(res => res.json())
        .then(data => {
            data.forEach((row) => {
                 if(row.result=="99334311355") {localStorage.setItem("authorized","99334311355");} 
                 else {localStorage.setItem("authorized","1100222118");}
                })
                location.reload();
        })
}
function getListAnime() {
    const formData = new FormData();
    formData.append('operation', 'getAnimeList');
    fetch(scriptUrl, {
        method: 'POST', body: formData
    })
        .then(res => res.json())
        .then(data => {
            dataOnSite = data;
            listOfAnimeInProfile.innerHTML = "";
            data.forEach((row) => {
                listOfAnimeInProfile.innerHTML += "<div class='anime-profile-div'>\n" +
                "<p class='anime-name'>"+ row.name+ ". Оценка: " + row.summaryGrade+ "</p>\n" +
                "<button type='button' class='deleteAnimeButton' onclick='deleteAnime(this)' anime-name='" + row.name + "'>Удалить</button>\n"+
                "</div>" +
                "<div class='line_under1'></div>\n" 
               })
        })
}
function deleteAnime(object) {
    const formData = new FormData();
    formData.append('operation', 'deleteAnime');
    formData.append('animeName', object.getAttribute("anime-name"));
    fetch(scriptUrl, {
        method: 'POST', body: formData
    })
        .then(res => res.json())
    location.reload();
}
window.onload = () => {
    if(localStorage.getItem("authorized") == "99334311355" || localStorage.getItem('authorized')==null || localStorage.getItem("authorized") != random11)
    {
        authorizationnav.innerHTML = "";
        authorizationnav.innerHTML += "<input type='password' name='inputPassword' id='inputPassword'>\n"+
        "<button type='button' onclick='authorization()' id='authorizationButton'>Войти</button>";  
    }
    else 
    {
        authorizationnav.innerHTML = "";
        authorizationnav.innerHTML += "<a class='hrefProfile' href='profile.html'>Профиль</a>";
    }
    showAllAnime(); 
}
function sortProfile() {
    let sortType = document.getElementById("sortParam");
    let data = dataOnSite;
    if (sortType.value == "nameAZ") {
        data.sort(function (a, b) {
            if (a.name.toString().toLowerCase() < b.name.toString().toLowerCase()) {
                return -1;
            }
            if (a.name.toString().toLowerCase() > b.name.toString().toLowerCase()) {
                return 1;
            }
            return 0;
        })
    }
    else if (sortType.value == "nameZA") {
        data.sort(function (a, b) {
            if (a.name.toString().toLowerCase() > b.name.toString().toLowerCase()) {
                return -1;
            }
            if (a.name.toString().toLowerCase() < b.name.toString().toLowerCase()) {
                return 1;
            }
            return 0;
        })
    }
    else if (sortType.value == "gradeB") {
        data.sort(function (a, b) {
            if (parseFloat(a.summaryGrade) > parseFloat(b.summaryGrade)) {
                return -1;
            }
            if (parseFloat(a.summaryGrade) < parseFloat(b.summaryGrade)) {
                return 1;
            }
            return 0;
        })
    }
    else if (sortType.value == "gradeW") {
        data.sort(function (a, b) {
            if (parseFloat(a.summaryGrade) < parseFloat(b.summaryGrade)) {
                return -1;
            }
            if (parseFloat(a.summaryGrade) > parseFloat(b.summaryGrade)) {
                return 1;
            }
            return 0;
        })
    }
    printListAnimeProfile(data);
}
function sortList(){
    let sortType = document.getElementById("sortParam");
    let data = dataOnSite;
    if (sortType.value == "nameAZ") {
        data.sort(function (a, b) {
            if (a.name.toString().toLowerCase() < b.name.toString().toLowerCase()) {
                return -1;
            }
            if (a.name.toString().toLowerCase() > b.name.toString().toLowerCase()) {
                return 1;
            }
            return 0;
        })
    }
    else if (sortType.value == "nameZA") {
        data.sort(function (a, b) {
            if (a.name.toString().toLowerCase() > b.name.toString().toLowerCase()) {
                return -1;
            }
            if (a.name.toString().toLowerCase() < b.name.toString().toLowerCase()) {
                return 1;
            }
            return 0;
        })
    }
    else if (sortType.value == "gradeB") {
        data.sort(function (a, b) {
            if (parseFloat(a.summaryGrade) > parseFloat(b.summaryGrade)) {
                return -1;
            }
            if (parseFloat(a.summaryGrade) < parseFloat(b.summaryGrade)) {
                return 1;
            }
            return 0;
        })
    }
    else if (sortType.value == "gradeW") {
        data.sort(function (a, b) {
            if (parseFloat(a.summaryGrade) < parseFloat(b.summaryGrade)) {
                return -1;
            }
            if (parseFloat(a.summaryGrade) > parseFloat(b.summaryGrade)) {
                return 1;
            }
            return 0;
        })
    }
    addGotData(data);
}
function printListAnimeProfile(data) {
    listOfAnimeInProfile.innerHTML = "";
    data.forEach((row) => {
        listOfAnimeInProfile.innerHTML += "<div class='anime-profile-div'>\n" +
        "<p class='anime-name'>"+ row.name+ ". Оценка: " + row.summaryGrade+ "</p>\n" +
        "<button type='button' class='deleteAnimeButton' onclick='deleteAnime(this)' anime-name='" + row.name + "'>Удалить</button>\n"+
        "</div>" +
        "<div class='line_under1'></div>\n" 
       })
}
