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

const effects = {
  chrome: {
    start: 50,
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
  start: 100,
  step: 0.1,
  connect: 'lower',
});

effectList.addEventListener('change', function () {
  const value = effectList.querySelector('.effects__radio:checked').value;
  setPictureClass(value);
  sliderElement.noUiSlider.set(EFFECT_MAX_LEVEL);
  effectToggleClick(value);
  if (value === 'chrome') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
    });
    sliderElement.noUiSlider.on('update', function (_, handle, unencoded) {
      effectLevel.value = unencoded[handle];
    });
  }
  if (value === 'sepia') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
    });
  }
  if (value === 'marvin') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
    });
  }
  if (value === 'phobos') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
    });
  }
  if (value === 'heat') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
    });
  }
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

const getEffectValue = function (value, effectName) {
  // const currentEffect = effects[effectName];
  // return currentEffect.min + value * (currentEffect.max - currentEffect.min) / EFFECT_MAX_LEVEL;
};

const setPictureEffect = function (effectName) {
  // const effectValue = getEffectValue(effectLevel.value, effectName);
  // uploadedPicture.style = effects[effectName].setFilter(effectValue);
};

const effectToggleClick = function (effectName) {
  // const selectedEffect = evt.target;
  if (effectName === defaultEffect) {
    scalePanel.classList.add('hidden');
  } else {
    scalePanel.classList.remove('hidden');
  }
  // setPictureClass(selectedEffect.value);
  // setPictureEffect(selectedEffect.value);
};

const initialize = function () {
  // Array.from(effectToggles).forEach((effectToggle) =>
  //   effectToggle.addEventListener('click', effectToggleClick));
  // defaultEffect.checked = true;
  setPictureClass(defaultEffect.value);
  setPictureEffect(defaultEffect.value);
  scalePanel.classList.add('hidden');
};

const finalize = () => {
  Array.from(effectToggles).forEach((effectToggle) =>
    effectToggle.removeEventListener('click', effectToggleClick));
};


export {initialize, finalize};
