const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

const closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', closeKeyHandler);
};
const closeKeyHandler = function (evt) {
  window.evt.isKeyEvent(evt, closeBigPicture);
};
const showPreviewHandler = function (elem) {
  elem.addEventListener('click', showBigPicture);
};

const showBigPicture = function (photoObj) {
  bigPicture.querySelector('.big-picture__img').src = photoObj.src;
  bigPicture.querySelector('.likes-count').textContent = photoObj.textContent;
  bigPicture.querySelector('.comments-count').textContent = photoObj.textContent;
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', closeKeyHandler);
  bigPictureClose.focus();
}

document.querySelectorAll('.pictures').forEach(showPreviewHandler);
bigPictureClose.addEventListener('click', closeBigPicture);
bigPictureClose.addEventListener('keydown', closeKeyHandler);

export {showBigPicture};
