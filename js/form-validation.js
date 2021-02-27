import {getArrayWithoutElement} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const hashTagsField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const HASH_TAG = {
  SYMBOL: '#',
  MIN_SIZE: 2,
  MAX_SIZE: 20,
  AMOUNT: 5,
};

const COMMENT_MAX_SIZE = 140;
const ERROR_STYLE = '2px solid #ff0000';

const setErrorValidStyle = function (element) {
  element.style.border = ERROR_STYLE;
};

const resetErrorValidStyle = function (element) {
  element.style.border = '';
};

const checkActions = [
  {
    message: false,
    check: (arg) => arg.length === 0,
  },
  {
    message: `Хэш-тэгов должно быть не более ${HASH_TAG.AMOUNT}`,
    check: (arg) => arg.length > HASH_TAG.AMOUNT,
  },
  {
    message: 'Хэш-тэг должен начинаться с #',
    check: (arg) => arg.some((value) => value[0] !== HASH_TAG.SYMBOL),
  },
  {
    message: `Хэш-тэг должен состоять минимум из ${HASH_TAG.MIN_SIZE} символов`,
    check: (arg) => arg.some((value) => value.length < HASH_TAG.MIN_SIZE),
  },
  {
    message: `Хэш-тэг не должен превышать ${HASH_TAG.MAX_SIZE} символов`,
    check: (arg) => arg.some((value) => value.length > HASH_TAG.MAX_SIZE),
  },
  {
    message: 'Хэш-тэги должны быть уникальными',
    check: (arg) => arg.some((value, index, arr) => arr.indexOf(value) !== index),
  },
  {
    message: false,
    check: (arg) => arg,
  },
];

const getCheckAction = (arg) => checkActions.find(({check}) => check(arg));

const getHashTagsArray = function (str) {
  const arr = str.split(' ').map(((value) => value.toLowerCase()));
  return getArrayWithoutElement(arr, '');
};

const checkHashTags = function (data) {
  const hashTags = getHashTagsArray(data);
  const {message} = getCheckAction(hashTags);
  if (message) {
    hashTagsField.setCustomValidity(message);
  } else {
    hashTagsField.setCustomValidity('');
  }
};

const checkComment = function (data) {
  if (data.length > COMMENT_MAX_SIZE) {
    commentField.setCustomValidity(`Длина комментария не должна
    превышать ${COMMENT_MAX_SIZE} символов. Текущая длина сообщения ${data.length}`);
  } else {
    commentField.setCustomValidity('');
  }
};

const clearCustomValidity = function (...fields) {
  fields.forEach((field) => {
    field.addEventListener('input', () => {
      field.setCustomValidity('');
    });
  });
};

const initialize = function () {
  clearCustomValidity(hashTagsField, commentField);

  submitButton.addEventListener('click', function () {
    checkHashTags(hashTagsField.value);
    checkComment(commentField.value);
  });

  uploadForm.addEventListener('invalid', function (evt) {
    setErrorValidStyle(evt.target);
  }, true);

  uploadForm.addEventListener('input', function (evt) {
    resetErrorValidStyle(evt.target);
  });
};

const finalize = function () {
  submitButton.removeEventListener('click', function () {
    checkHashTags(hashTagsField.value);
    checkComment(commentField.value);
  });

  uploadForm.removeEventListener('invalid', function (evt) {
    setErrorValidStyle(evt.target);
  }, true);

  uploadForm.removeEventListener('input', function (evt) {
    resetErrorValidStyle(evt.target);
  });
}

export {initialize, finalize};
