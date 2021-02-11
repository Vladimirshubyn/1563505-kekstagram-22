const PHOTO_OBJECTS = 24;
const PHOTO_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const PHOTO_NAMES = ['Виктория','Артем','Михаил','Александр','Алексей','Юлия','Потап','Афанасий'];
const MIN_ID = 1;
const MAX_ID = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;

// Функция для массива комментариев

const getRandomNumber = function(min, max) {
  let randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
}

const getRandomItem = function(arr) {
  let randomIndex = getRandomNumber(0, arr.length - 1);
  return arr[randomIndex];
}

const generateComments = function() {
  const randomComments = [];
  for (let i = 0; i <= getRandomNumber (0, 500); i++) {
    randomComments [i] = {
      id: getRandomNumber (0, 500),
      avatar: 'img/avatar-' + getRandomNumber (1, 6) + '.svg',
      message: getRandomItem(PHOTO_COMMENTS),
      name: getRandomItem(PHOTO_NAMES),
    };
  }
  return randomComments;
}

const generatePictures = function () {
  const pictures = [];
  for (let i = 0; i <= PHOTO_OBJECTS; i++) {
    const number = i + 1;
    pictures[i] = {
      id: getRandomNumber (MIN_ID, MAX_ID),
      url: 'photos/' + number + '.jpg',
      likes: getRandomNumber (MIN_LIKES, MAX_LIKES),
      comments: generateComments (),
      description: 'Описание фотографии пользователя',
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
