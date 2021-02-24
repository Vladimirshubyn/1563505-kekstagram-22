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


const isKeyEscEvent = function (evt, action) {
  const ESC_KEYCODE = 27;
  if (evt.keyCode === ESC_KEYCODE) {
    action();
  }
};

const getArrayWithoutElement = (initialArray, deletedElement) =>
  initialArray.reduce((acc, value) => value === deletedElement ? acc : [...acc, value], []);

export {getRandomNumber, getRandomItem, isKeyEscEvent, checkLineLength, getArrayWithoutElement};
