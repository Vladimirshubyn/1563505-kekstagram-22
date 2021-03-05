// Функция для массива комментариев

const getRandomNumber = function(min, max) {
  let randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
}

const getRandomItem = function(arr) {
  let randomIndex = getRandomNumber(0, arr.length - 1);
  return arr[randomIndex];
}

//Функция для проверки максимальной длины строки

const checkLineLength = function(line, maxLineLength) {
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

const getRandomArray = (initialArray, min = 1, max = initialArray.length) => {
  const copiedArray = initialArray.slice();
  const length = getRandomNumber(min, max);

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
  const ESC_KEYCODE = 27;
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
