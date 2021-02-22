const sliderElement = document.querySelector('.effect-level__slider');
const editPanel = document.querySelector('.img-upload__overlay');
const scalePanel = editPanel.querySelector('.effect-level');
const effectLevel = scalePanel.querySelector('.effect-level__value');
const effectPanel = editPanel.querySelector('.effects');
const effectList = editPanel.querySelector('.effects__list');
const effectToggles = effectPanel.querySelectorAll('.effects__radio');
const defaultEffect = effectPanel.querySelector('#effect-none');
const uploadedPicture = editPanel.querySelector('.img-upload__preview > img');

const EFFECT_MAX_LEVEL = 100;

const effects = {
  chrome: {
    min: 0,
    max: 1,
    setFilter: (value) => `grayscale(${value})`,
  },
  sepia: {
    min: 0,
    max: 1,
    setFilter: (value) => `sepia(${value})`,
  },
  marvin: {
    min: 0,
    max: 100,
    setFilter: (value) => `invert(${value}%)`,
  },
  phobos: {
    min: 0,
    max: 3,
    setFilter: (value) => `blur(${value}px)`,
  },
  heat: {
    min: 1,
    max: 3,
    setFilter: (value) => `brightness(${value})`,
  },
  none: {
    min: 0,
    max: 0,
    setFilter: () => 'none',
  },
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 0.1,
  connect: 'lower',
});

effectList.addEventListener('change', function () {
  if (effectList.querySelector('.effects__radio').checked) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 0.5,
      step: 0.1,
    });
  }
});

let currentPictureClass;

const setPictureClass = function (effectName) {
  if (currentPictureClass) {
    uploadedPicture.classList.remove(currentPictureClass);
  }
  uploadedPicture.classList.add(`effects__preview--${effectName}`);
  currentPictureClass = `effects__preview--${effectName}`;
};

const getEffectValue = function (value, effectName) {
  const currentEffect = effects[effectName];
  return currentEffect.min + value * (currentEffect.max - currentEffect.min) / EFFECT_MAX_LEVEL;
};

const setPictureEffect = (effectName) => {
  const effectValue = getEffectValue(effectLevel.value, effectName);
  uploadedPicture.style.filter = effects[effectName].setFilter(effectValue);
};

const effectToggleClick = function (evt) {
  const selectedEffect = evt.target;
  if (selectedEffect === defaultEffect) {
    sliderElement.hide();
  } else {
    sliderElement.show();
    sliderElement.setPinAction(selectedEffect.value, setPictureEffect);
  }
  sliderElement.setPinPosition(EFFECT_MAX_LEVEL);
  setPictureClass(selectedEffect.value);
  setPictureEffect(selectedEffect.value);
};

const initialize = function () {
  Array.from(effectToggles).forEach((effectToggle) =>
    effectToggle.addEventListener('click', effectToggleClick));
  defaultEffect.checked = true;
  setPictureClass(defaultEffect.value);
  setPictureEffect(defaultEffect.value);
  sliderElement.hide();
};

const finalize = () => {
  Array.from(effectToggles).forEach((effectToggle) =>
    effectToggle.removeEventListener('click', effectToggleClick));
};
