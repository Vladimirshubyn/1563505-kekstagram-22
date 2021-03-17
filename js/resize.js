const PictureSize = {
  MIN: 25,
  MAX: 100,
  DEFAULT: 100,
  STEP: 25,
};
const uploadForm = document.querySelector('.img-upload__form');
const resizeMinus = uploadForm.querySelector('.scale__control--smaller');
const resizePlus = uploadForm.querySelector('.scale__control--bigger');
const resizeValue = uploadForm.querySelector('.scale__control--value');
const picturePreview = uploadForm.querySelector('.img-upload__preview');

let currentPictureSize = 100;

const setPictureSize = function (size) {
  resizeValue.value = `${size}%`;
  picturePreview.style = `transform: scale(${size / 100})`;
  currentPictureSize = size;
};

const resizeMinusClick = function () {
  if (currentPictureSize > PictureSize.MIN) {
    const newSize = currentPictureSize - PictureSize.STEP;
    setPictureSize(newSize);
  }
};

const resizePlusClick = function () {
  if (currentPictureSize < PictureSize.MAX) {
    const newSize = currentPictureSize + PictureSize.STEP;
    setPictureSize(newSize);
  }
};

const initializeResize = function () {
  setPictureSize(PictureSize.DEFAULT);
  resizeMinus.addEventListener('click', resizeMinusClick);
  resizePlus.addEventListener('click', resizePlusClick);
};

const finalizeResize = function () {
  resizeMinus.removeEventListener('click', resizeMinusClick);
  resizePlus.removeEventListener('click', resizePlusClick);
};

export {initializeResize, finalizeResize};
