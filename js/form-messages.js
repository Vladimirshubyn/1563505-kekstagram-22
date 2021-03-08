const main = document.querySelector('main');
const uploadErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const uploadSuccessTemplate = document.querySelector('#success').content.querySelector('.success');

const renderErrorMessage = function (message) {
  const errorMessage = uploadErrorTemplate.cloneNode(true);
  errorMessage.querySelector('.error__title').content = message;
  errorMessage.querySelector('.error__button').content = message
  main.insertAdjacentElement('beforeEnd', errorMessage);
  errorMessage.querySelector('.error__button').addEventListener('click', function () {
    errorMessage.remove(main);
    document.removeEventListener('keydown', closeKeyHandler);
  });
  const closeKeyHandler = function (evt) {
    const ESC_KEYCODE = 27;
    if (evt.keyCode === ESC_KEYCODE) {
      errorMessage.remove(main);
    }
  };
  document.addEventListener('keydown', closeKeyHandler);
  return errorMessage;
}

const renderSuccessMessage = function (message) {
  const successMessage = uploadSuccessTemplate.cloneNode(true);
  successMessage.querySelector('.success__title').content = message;
  successMessage.querySelector('.success__button').content = message;
  main.insertAdjacentElement('beforeEnd', successMessage);
  successMessage.querySelector('.success__button').addEventListener('click', function () {
    successMessage.remove(main);
    document.removeEventListener('keydown', closeKeyHandler);
  });
  const closeKeyHandler = function (evt) {
    const ESC_KEYCODE = 27;
    if (evt.keyCode === ESC_KEYCODE) {
      successMessage.remove(main);
    }
  };
  document.addEventListener('keydown', closeKeyHandler);
  return successMessage;
}

export {renderErrorMessage, renderSuccessMessage};
