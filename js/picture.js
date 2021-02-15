import {generatePictures} from './mock.js';

const pictureTeplate = document.querySelector ('#picture').content;
const picturesList = document.querySelector('.pictures');
const sortedPicturesList = [];

const renderMiniatures = function (photo) {
  const photoMiniature = pictureTeplate.cloneNode(true);
  photoMiniature.querySelector('img').src = photo.url;
  photoMiniature.querySelector('.picture__likes').textContent = photo.likes;
  photoMiniature.querySelector('.picture__comments').textContent = photo.comments.length;
  return photoMiniature;
}
const makeGallery = function () {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < sortedPicturesList.length; i++) {
    fragment.appendChild(renderMiniatures(sortedPicturesList[i]));
  }
  picturesList.appendChild(fragment);
};

const pictures = generatePictures();
makeGallery(pictures);
