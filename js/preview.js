import {isKeyEscEvent} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const socialCommentsList = bigPicture.querySelector('.social__comments');
const socialCommentTemplate = socialCommentsList.querySelector('.social__comment');

const closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeKeyHandler);
};
const closeKeyHandler = function (evt) {
  isKeyEscEvent(evt, closeBigPicture);
};

const showBigPicture = function (photoObj) {
  bigPicture.querySelector('.social__caption').textContent = photoObj.description;
  bigPicture.querySelector('.big-picture__img img').src = photoObj.url;
  bigPicture.querySelector('.likes-count').textContent = photoObj.likes;
  bigPicture.querySelector('.comments-count').textContent = photoObj.comments.length;

  while (socialCommentsList.firstChild) {
    socialCommentsList.removeChild(socialCommentsList.firstChild);
  }

  const createSocialCommentsList = function (commentObj) {
    const socialComment = socialCommentTemplate.cloneNode(true);
    socialComment.querySelector('.social__picture').src = commentObj.avatar;
    socialComment.querySelector('.social__text').textContent = commentObj.message;
    return socialComment;
  }

  const makeCommentList = function (arr) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < arr.length; i++) {
      fragment.appendChild(createSocialCommentsList(arr[i]));
    }
    socialCommentsList.appendChild(fragment);
  };

  makeCommentList (photoObj.comments);

  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', closeKeyHandler);
  bigPictureClose.focus();
}

bigPictureClose.addEventListener('click', closeBigPicture);
bigPictureClose.addEventListener('keydown', closeKeyHandler);
document.body.classList.add('modal-open');


export {showBigPicture};
