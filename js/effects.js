const sliderElement = document.querySelector('.effect-level__slider');
const editPanel = document.querySelector('.img-upload__overlay');
const scalePanel = editPanel.querySelector('.effect-level');
const effectLevel = scalePanel.querySelector('.effect-level__value');
const effectPanel = editPanel.querySelector('.effects');
const effectList = editPanel.querySelector('.effects__list');
const effectToggles = effectPanel.querySelectorAll('.effects__radio');
const defaultEffect = effectPanel.querySelector('#effect-none').value;
const uploadedPicture = editPanel.querySelector('.img-upload__preview img');

const EFFECT_MAX_LEVEL = 100;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 0.1,
  connect: 'lower',
});

effectList.addEventListener('change', function () {
  const value = effectList.querySelector('.effects__radio:checked').value;
  setPictureClass(value);
  sliderElement.noUiSlider.set(EFFECT_MAX_LEVEL);
  effectToggleClick(value);
});

effectLevel.value = 100;

let currentPictureClass;

const setPictureClass = function (effectName) {
  if (currentPictureClass) {
    uploadedPicture.classList.remove(currentPictureClass);
  }
  uploadedPicture.classList.add(`effects__preview--${effectName}`);
  currentPictureClass = `effects__preview--${effectName}`;
};

const setPictureEffect = function (value) {
  const effectValue = effectList.querySelector('.effects__radio:checked').value;
  switch (effectValue) {
    case 'chrome': {
      uploadedPicture.style = `filter: grayscale(${value / 100})`;
      break;
    }
    case 'sepia': {
      uploadedPicture.style = `filter: sepia(${value / 100})`;
      break;
    }
    case 'marvin': {
      uploadedPicture.style = `filter: invert(${value}%)`;
      break;
    }
    case 'phobos': {
      uploadedPicture.style = `filter: blur(${value * 100 / 300})`;
      break;
    }
    case 'heat': {
      uploadedPicture.style = `filter: brightness(${value / 50})`;
      break;
    }
    case 'none': {
      uploadedPicture.style = 'filter: none';
      break;
    }
  }
};

sliderElement.noUiSlider.on('update', function (value) {
  const floatValue = Number.parseFloat(value[0]);
  setPictureEffect(floatValue);
});

const effectToggleClick = function (effectName) {
  if (effectName === defaultEffect) {
    scalePanel.classList.add('hidden');
  } else {
    scalePanel.classList.remove('hidden');
  }
};

const initialize = function () {
  setPictureClass(defaultEffect.value);
  scalePanel.classList.add('hidden');
};

const finalize = () => {
  Array.from(effectToggles).forEach((effectToggle) =>
    effectToggle.removeEventListener('click', effectToggleClick));
};


export {initialize, finalize};
