const scriptUrl = 'https://script.google.com/macros/s/AKfycbxLewraHFsxim_y-KJ66K4unZYGY5CH4QD1QUnEy2g0_BkBk_fsAVoQhrWoKBpBYubv/exec';
const pictureInput = document.getElementById("inputPicture");


function postData(object)
{
const fileInput = document.querySelector('#inputPicture') ;
const formData = new FormData();

formData.append('file', fileInput.files[0]);

const options = {
  method: 'POST',
  body: formData,
  // If you add this, upload won't work
  // headers: {
  //   'Content-Type': 'multipart/form-data',
  // }
};

fetch(scriptUrl, options);
}