'use strict';

//Функция, возвращающая случайное целое число из переданного диапазона включительно. Источник https://learn.javascript.ru/
const PHOTO_OBJECTS = 24;
const PHOTO_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const PHOTO_DESCRIPTIONS = ['Фотография пользователя 1', 'Фотография пользователя 2', 'Фотография пользователя 3'];
const PHOTO_NAMES = ['Виктория','Артем','Михаил','Александр','Алексей','Юлия','Потап','Афанасий'];
const MIN_ID = 1;
const MAX_ID = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;

const getRandomNumber = function(min, max) {
  let randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
}

const generatePictures = function () {
  const pictures = [];
  for (let i = 0; i <= PHOTO_OBJECTS; i++) {
    const number = i++;
    pictures[i] = {
      id: getRandomNumber (MIN_ID, MAX_ID),
      url: 'photos/' + number + '.jpg',
      likes: getRandomNumber (MIN_LIKES, MAX_LIKES),
      comments: {
        id: getRandomNumber (0, 500),
        avatar: 'img/avatar-' + getRandomNumber (1, 6) + '.svg',
        message: getRandomNumber(MIN_COMMENTS, PHOTO_COMMENTS.length),
        name: getRandomNumber(PHOTO_NAMES.length),
      },
      description: getRandomNumber(PHOTO_DESCRIPTIONS.length),

    };
  }
  return pictures;
}
const pictures = generatePictures();
pictures;

//Функция для проверки максимальной длины строки

const checkLineLength = function(line, maxLineLength) {
  if (line.length <= maxLineLength) {
    return true;
  } else {
    return false;
  }
}
checkLineLength('', 140);
