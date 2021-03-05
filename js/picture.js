import * as filter from './filter.js';

import {showBigPicture} from './preview.js';
import {createFetch} from './create-fetch.js';

const pictureTeplate = document.querySelector ('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

const renderMiniatures = function (photo) {
  const photoMiniature = pictureTeplate.cloneNode(true);
  photoMiniature.querySelector('img').src = photo.url;
  photoMiniature.querySelector('.picture__likes').textContent = photo.likes;
  photoMiniature.querySelector('.picture__comments').textContent = photo.comments.length;
  photoMiniature.addEventListener('click', function () {
    showBigPicture(photo);
  });
  return photoMiniature;
}
const makeGallery = function (arr) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < arr.length; i++) {
    fragment.appendChild(renderMiniatures(arr[i]));
  }
  picturesList.appendChild(fragment);
};

const onError = function () {
  alert('Не удалось загрузить галлерею');
};

const onSuccess = function (picture) {
  makeGallery(picture);
  filter.initialize(picture);
}

const initialize = function () {
  createFetch(onSuccess, onError);
}
initialize();

const removePhotos = function () {
  pictureTeplate.forEach((it) => picturesList.removeChild(it));
};

const updatePhotos = function (photoArray) {
  removePhotos();
  makeGallery(photoArray);
};

export {renderMiniatures, picturesList, updatePhotos};
