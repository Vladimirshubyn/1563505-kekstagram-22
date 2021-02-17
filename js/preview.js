const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

window.evt = {
  ESC_KEYCODE: 27,
  ENTER_KEYCODE: 13,
  isKeyEvent: function (evt, action) {
    if (evt.keyCode === window.evt.ESC_KEYCODE || window.evt.ENTER_KEYCODE) {
      action();
    }
  },
};
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

const showBigPicture = function (evt) {
  evt.preventDefault();
  const clickedPicture = evt.target.parentNode;
  bigPicture.querySelector('.big-picture__img').src = clickedPicture.querySelector('img').src;
  bigPicture.querySelector('.likes-count').textContent = clickedPicture.querySelector('.picture__likes').textContent;
  bigPicture.querySelector('.comments-count').textContent = clickedPicture.querySelector('.picture__comments').textContent;
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', closeKeyHandler);
  bigPictureClose.focus();
}

document.querySelectorAll('.pictures').forEach(showPreviewHandler);
bigPictureClose.addEventListener('click', closeBigPicture);
bigPictureClose.addEventListener('keydown', closeKeyHandler);
