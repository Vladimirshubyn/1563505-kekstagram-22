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
  resize.finalizeResize();
  document.body.classList.remove('modal-open');
  editPanel.classList.add('hidden');
};

const openUploadForm = function () {
  validation.initializeValidation();
  resize.initializeResize();
  effects.initializeEffects();
  document.body.classList.add('modal-open');
  editPanel.classList.remove('hidden');
};

uploadButton.addEventListener('change', openUploadForm);
uploadForm.addEventListener('submit', uploadFormSubmit);
editPanelClose.addEventListener('click', editPanelCloseClick);
document.addEventListener('keydown', closeEditPanelHandler);
