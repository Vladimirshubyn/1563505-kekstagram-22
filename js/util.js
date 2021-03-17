const ESC_KEYCODE = 27;

const getRandomNumber = function(min, max) {
  let randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
}

const getRandomArrayElement = function (initialArray, needRemove = false) {
  const randomElementIndex = getRandomNumber(0, initialArray.length - 1);
  const randomElement = initialArray[randomElementIndex];
  if (needRemove) {
    initialArray.splice(randomElementIndex, 1);
  }
  return randomElement;
};

const getRandomArray = function (initialArray) {
  const copiedArray = initialArray.slice();
  const length = 10;

  const makeIter = (acc, array) => {
    if (acc.length === length) {
      return acc;
    }

    const randomElement = getRandomArrayElement(array, true);
    return makeIter([...acc, randomElement], array);
  };
  return makeIter([], copiedArray);
};

const isKeyEscEvent = function (evt, action) {
  if (evt.keyCode === ESC_KEYCODE) {
    action();
  }
};

let lastTimeout;

const debounce = (cb, debounceInterval) => {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(cb, debounceInterval);
};

export {isKeyEscEvent, getRandomArray, debounce};
