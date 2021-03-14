const ESC_KEYCODE = 27;

const getRandomNumber = function(min, max) {
  let randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
}

const getRandomItem = function(arr) {
  let randomIndex = getRandomNumber(0, arr.length - 1);
  return arr[randomIndex];
}

const checkLineLength = function (line, maxLineLength) {
  if (line.length <= maxLineLength) {
    return true;
  } else {
    return false;
  }
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

  const iter = (acc, array) => {
    if (acc.length === length) {
      return acc;
    }

    const randomElement = getRandomArrayElement(array, true);
    return iter([...acc, randomElement], array);
  };

  return iter([], copiedArray);
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

const getArrayWithoutElement = (initialArray, deletedElement) =>
  initialArray.reduce((acc, value) => value === deletedElement ? acc : [...acc, value], []);

export {getRandomNumber, getRandomItem, isKeyEscEvent, checkLineLength, getArrayWithoutElement, getRandomArray, debounce};
