'use strict';

//Функция, возвращающая случайное целое число из переданного диапазона включительно. Источник https://learn.javascript.ru/

const getRandomInteger = function(min, max) {
  let randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
}
alert(getRandomInteger());

//Функция для проверки максимальной длины строки

const checkLineLength = function(line, maxLineLength) {
  maxLineLength = 140;
  if (line < maxLineLength) {
    return line.length;
  }
}
alert(checkLineLength());
