import * as resize from './resize.js';

const uploadButton = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__form');
const editPanel = document.querySelector('.img-upload__overlay');
const editPanelClose = editPanel.querySelector('#upload-cancel');
const uploadMessage = uploadForm.querySelector('.img-upload__message--loading');
const uploadedPicture = editPanel.querySelector('.img-upload__preview > img');
const uploadErrorMessage = docu.querySelector('.error__message');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const successUpload = function () {
  uploadForm.reset();
  editPanelCloseClick();
};

const errorUpload = function (message) {
  editPanelCloseClick();
  uploadErrorMessage.textContent = message;
};

const editPanelCloseClick = function () {
  uploadForm.reset();
  uploadButton.value = '';
  resize.finalize();
  document.body.classList.remove('modal-open');
  editPanel.classList.add('hidden');
  editPanelClose.removeEventListener('click', editPanelCloseClick);
};

const openUploadForm = function () {
  document.body.classList.add('modal-open');
  editPanel.classList.remove('hidden');
};

const uploadFile = function (file, fileTypes, cb) {
  if (file) {
    const fileName = file.name.toLowerCase();

    const matches = fileTypes.some((fileType) => fileName.endsWith(fileType));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        cb(reader.result);
      });

      reader.readAsDataURL(file);
    }
  }
};

const initialize = function (evt) {
  uploadMessage.classList.remove('hidden');
  const file = evt.target.files[0];
  uploadFile(file, FILE_TYPES, (readingResult) => {
    uploadedPicture.src = readingResult;

    openUploadForm();
    uploadMessage.classList.add('hidden');
  });
};
