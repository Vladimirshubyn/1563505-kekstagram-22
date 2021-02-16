import {generatePictures, generateComments} from './mock.js';
import {renderMiniatures} from './picture.js';
import {picturesList} from './picture.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const socialCommentsList = bigPicture.querySelector('.social__comments');

const showBigPicture = function (arr) {
  bigPicture.querySelector('.social__caption').textContent = arr.comments[0];
  bigPicture.querySelector('.big-picture__img img').src = arr.url;
  bigPicture.querySelector('.likes-count').textContent = arr.likes;
  bigPicture.querySelector('.comments-count').textContent = arr.comments.length;

  const fragment = document.createDocumentFragment();

  generateComments ();

  while (socialCommentsList.firstChild) {
    socialCommentsList.removeChild(socialCommentsList.firstChild);
  }

  socialCommentsList.appendChild(fragment);
  socialCommentsList.firstChild.style.display = 'none';
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
  bigPicture.classList.remove('hidden');
};

const miniaturePhoto = renderMiniatures()

const pictureMiniatureEvent = function (evt, isKeyDown) {
  miniaturePhoto.forEach(function(pictures) {
    if (isKeyDown) {
      if (evt.target.querySelector('img').getAttribute('src') === pictures.url) {
        showBigPicture(pictures);
      }
    }
    if (evt.target.getAttribute('src') === pictures.url) {
      showBigPicture(pictures);
    }
  });
  document.body.classList.add('modal-open');
  bigPictureClose.addEventListener('click', function () {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  });
};

picturesList.addEventListener('click', function (evt) {
  if (evt.target.className === 'picture__img') {
    pictureMiniatureEvent(evt);
  }
});
