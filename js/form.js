const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
import * as resize from './resize.js';
import * as effects from './effects.js';
import * as validation from './form-validation.js';
import {isKeyEscEvent} from './util.js';
import {postFetch} from './create-fetch.js';
import {renderErrorMessage, renderSuccessMessage} from './form-messages.js';
const uploadButton = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__form');
const editPanel = document.querySelector('.img-upload__overlay');
const editPanelClose = editPanel.querySelector('#upload-cancel');
const uploadMessage = uploadForm.querySelector('.img-upload__message--loading');
const uploadedPicture = editPanel.querySelector('.img-upload__preview img');
const hashTagsField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');

const successUpload = function () {
  uploadForm.reset();
  renderSuccessMessage();
  editPanelCloseClick();
};

const errorUpload = function () {
  editPanelCloseClick();
  renderErrorMessage();
};

const uploadFormSubmit = function (evt) {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  postFetch(formData, successUpload, errorUpload);
};

const closeEditPanelHandler = function (evt) {
  if (evt.target !== hashTagsField && evt.target !== commentField) {
    isKeyEscEvent(evt, editPanelCloseClick);
  }
};

const editPanelCloseClick = function () {
  uploadForm.reset();
  uploadButton.value = '';
  resize.finalize();
  document.body.classList.remove('modal-open');
  editPanel.classList.add('hidden');
};

const openUploadForm = function () {
  validation.initialize();
  resize.initialize();
  effects.initialize();
  document.body.classList.add('modal-open');
  editPanel.classList.remove('hidden');
};

uploadButton.addEventListener('change', openUploadForm);
uploadForm.addEventListener('submit', uploadFormSubmit);
editPanelClose.addEventListener('click', editPanelCloseClick);
document.addEventListener('keydown', closeEditPanelHandler);

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

export {initialize};
