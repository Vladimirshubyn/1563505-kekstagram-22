const HashTag = {
  SYMBOL: '#',
  MIN_SIZE: 2,
  MAX_SIZE: 20,
  AMOUNT: 5,
};
const COMMENT_MAX_SIZE = 140;
const ERROR_STYLE = '2px solid #ff0000';
const uploadForm = document.querySelector('.img-upload__form');
const hashTagsField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const CheckActions = [
  {
    message: false,
    check: (arg) => arg.length === 0,
  },
  {
    message: `Хэш-тэгов должно быть не более ${HashTag.AMOUNT}`,
    check: (arg) => arg.length > HashTag.AMOUNT,
  },
  {
    message: 'Хэш-тэг должен начинаться с #',
    check: (arg) => arg.some((value) => value[0] !== HashTag.SYMBOL),
  },
  {
    message: `Хэш-тэг должен состоять минимум из ${HashTag.MIN_SIZE} символов`,
    check: (arg) => arg.some((value) => value.length < HashTag.MIN_SIZE),
  },
  {
    message: `Хэш-тэг не должен превышать ${HashTag.MAX_SIZE} символов`,
    check: (arg) => arg.some((value) => value.length > HashTag.MAX_SIZE),
  },
  {
    message: 'Хэш-тэги должны быть уникальными',
    check: (arg) => arg.some((value, index, arr) => arr.indexOf(value) !== index),
  },
  {
    message: 'Хэш-тэги не должны содержать спец-символы',
    check: (arg) => arg.some((value) => !(/^.[^\W]+$/.test(value))),
  },
  {
    message: false,
    check: (arg) => arg,
  },
];
const setErrorValidStyle = function (element) {
  element.style.border = ERROR_STYLE;
};

const resetErrorValidStyle = function (element) {
  element.style.border = '';
};

const getCheckAction = (arg) => CheckActions.find(({check}) => check(arg));

const getHashTagsArray = function (str) {
  const arr = str.split(' ').map(((value) => value.toLowerCase()));
  return arr.filter (item => item !== '');
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

const initializeValidation = function () {
  clearCustomValidity(hashTagsField, commentField);
};

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


export {initializeValidation};
