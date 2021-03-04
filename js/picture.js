import {generatePictures} from './mock.js';
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
const pictures = generatePictures();

const onError = function () {
  alert('Не удалось загрузить галлерею');
};

const onSuccess = function () {
  makeGallery(pictures);
}

const initialize = function () {
  createFetch(onSuccess, onError);
}
initialize();

export {renderMiniatures, picturesList};
