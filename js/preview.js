import {isKeyEscEvent} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const socialCommentsList = bigPicture.querySelector('.social__comments');
const commentsLoadMoreButton  = bigPicture.querySelector('.comments-loader');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const socialCommentTemplate = socialCommentsList.querySelector('.social__comment');
const comments = [];
const COMMENTS_STEP = 5;

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

  const enterPressLoadMore = function (evt) {
    const ENTER_KEY_CODE = 13;
    if (evt.keyCode === ENTER_KEY_CODE) {
      commentsLoadMoreButtonClick();
    }
  };

  const showCommentsLoadMoreButton = function () {
    commentsLoadMoreButton.classList.remove('hidden');
    commentsLoadMoreButton.addEventListener('click', commentsLoadMoreButtonClick);
    commentsLoadMoreButton.addEventListener('keydown', enterPressLoadMore);
  };

  const hideCommentsLoadMoreButton = function () {
    commentsLoadMoreButton.classList.add('hidden');
    commentsLoadMoreButton.removeEventListener('click', commentsLoadMoreButtonClick);
    commentsLoadMoreButton.removeEventListener('keydown', enterPressLoadMore);
  };

  const commentsLoadMoreButtonClick = function () {
    if (comments.length <= COMMENTS_STEP) {
      hideCommentsLoadMoreButton();
    }
    makeCommentList(photoObj.comments.splice(0, COMMENTS_STEP));
  };

  const showCommentsCount = function () {
    commentsCount.classList.remove('hidden');
    makeCommentList(photoObj.comments.splice(0, COMMENTS_STEP));
  };

  const hideCommentsCount = function () {
    commentsCount.classList.add('hidden');
  };

  if (photoObj.comments.length <= COMMENTS_STEP) {
    hideCommentsLoadMoreButton();
  } else {
    showCommentsLoadMoreButton();
  }

  commentsCount.querySelector('.comments-count').textContent = comments.length;

  makeCommentList (photoObj.comments.splice(0, COMMENTS_STEP - 5));

  showCommentsCount();

  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', closeKeyHandler);
  bigPictureClose.focus();
  hideCommentsCount();
}

bigPictureClose.addEventListener('click', closeBigPicture);
bigPictureClose.addEventListener('keydown', closeKeyHandler);
document.body.classList.add('modal-open');


export {showBigPicture};
