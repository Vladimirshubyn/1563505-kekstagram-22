import * as resize from './resize.js';

const uploadButton = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__form');
const editPanel = document.querySelector('.img-upload__overlay');
const editPanelClose = editPanel.querySelector('#upload-cancel');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const successUpload = function () {
  uploadForm.reset();
  editPanelCloseClick();
};

const openUploadForm = function () {
  resize.initialize();
  document.body.classList.add('modal-open');
  editPanel.classList.remove('hidden');
  editPanelClose.addEventListener('click', editPanelCloseClick);
}

const editPanelCloseClick = function () {
  uploadForm.reset();
  uploadButton.value = '';
  resize.finalize();
  document.body.classList.remove('modal-open');
  editPanel.classList.add('hidden');
  editPanelClose.removeEventListener('click', editPanelCloseClick);
};
