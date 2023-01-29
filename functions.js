const scriptUrl = 'https://script.google.com/macros/s/AKfycbxLewraHFsxim_y-KJ66K4unZYGY5CH4QD1QUnEy2g0_BkBk_fsAVoQhrWoKBpBYubv/exec';
let dataOnSite;
window.onload = () => {
    showAllAnime(); 
}

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
    .then(data => {})
    location.reload();
}

function Authorization(){
    const formData = new FormData();
    const inputPassword = document.getElementById("inputPassword");
    formData.append('operation', 'authorization');
    formData.append('password', inputPassword.value);
    fetch(scriptUrl, {
        method: 'POST', body: formData
    })
        .then(res => res.json())
        .then(data => {console.log(data)})
}