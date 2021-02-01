'use strict';

//Функция, возвращающая случайное целое число из переданного диапазона включительно. Источник https://learn.javascript.ru/

const getRandomInteger = function(min, max) {
  let randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
}
getRandomInteger(1, 140);

//Функция для проверки максимальной длины строки

const checkLineLength = function(line, maxLineLength) {
  if (line.length <= maxLineLength) {
    return true;
  } else {
    return false;
  }
}
checkLineLength('', 140);
