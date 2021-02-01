'use strict';

//Функция, возвращающая случайное целое число из переданного диапазона включительно. Источник https://learn.javascript.ru/

const getRandomInteger = function(min, max) {
  let randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
}
console.log(getRandomInteger(1, 500));

//Функция для проверки максимальной длины строки

const checkLineLength = function(line, maxLineLength) {
  if (line.length === 0) {
    return null
  }
  if (line.length <= maxLineLength) {
    return true;
  } {
    return false;
  }
}
console.log(checkLineLength('', 140));
