const uploadForm = document.querySelector('.img-upload__form');
const resizeMinus = uploadForm.querySelector('.scale__control--smaller');
const resizePlus = uploadForm.querySelector('.scale__control--bigger');
const resizeValue = uploadForm.querySelector('.scale__control--value');
const picturePreview = uploadForm.querySelector('.img-upload__preview');

const PICTURE_SIZE = {
  MIN: 25,
  MAX: 100,
  DEFAULT: 100,
  STEP: 25,
};

let currentPictureSize = 100;

const setPictureSize = function (size) {
  resizeValue.value = `${size}%`;
  picturePreview.style = `transform: scale(${size / 100})`;
  currentPictureSize = size;
};

const resizeMinusClick = function () {
  if (currentPictureSize > PICTURE_SIZE.MIN) {
    const newSize = currentPictureSize - PICTURE_SIZE.STEP;
    setPictureSize(newSize);
  }
};

const resizePlusClick = function () {
  if (currentPictureSize < PICTURE_SIZE.MAX) {
    const newSize = currentPictureSize + PICTURE_SIZE.STEP;
    setPictureSize(newSize);
  }
};

const initialize = function () {
  setPictureSize(PICTURE_SIZE.DEFAULT);
  resizeMinus.addEventListener('click', resizeMinusClick);
  resizePlus.addEventListener('click', resizePlusClick);
};

const finalize = function () {
  resizeMinus.removeEventListener('click', resizeMinusClick);
  resizePlus.removeEventListener('click', resizePlusClick);
};

export {initialize, finalize};
