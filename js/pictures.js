'use strict';

var OBJECTS_COUNT = 25;
var MIN_LIKES_COUNT = 15;
var MAX_LIKES_COUNT = 200;
var COMMENTS_COUNT = 2;

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTION = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

/*
1. массив из обьектов
*/

var getPicturesPath = function (number) {
  var newArr = [];
  for (var i = 0; i < number; i++) {
    newArr[i] = 'photos/' + (i + 1) + '.jpg';
  }
  newArr.sort(function () {
    return Math.random();
  });
  return newArr;
};

var getRandomInteger = function (min, max) {
  max += 1;
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomSorting = function (arr) {
  arr.sort(function () {
    return 0.5 - Math.random();
  });
  return arr;
};

var getComments = function (arr, numberOfComments) {
  var newArr = [];
  var displayCommentsCount = getRandomInteger(1, numberOfComments);
  arr = getRandomSorting(arr);
  for (var i = 0; i < displayCommentsCount; i++) {
    newArr[i] = arr[i];
  }
  return newArr;
};

var getDescription = function (arr) {
  var newStr = '';
  var randomStr = getRandomInteger(0, arr.length - 1);
  newStr = arr[randomStr];
  return newStr;
};

var pictures = [];


var getPicturesArray = function (number) {
  var picturesPath = getPicturesPath(number);
  for (var i = 0; i < number; i++) {
    pictures[i] = {
      url: picturesPath[i],
      likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
      comments: getComments(COMMENTS, COMMENTS_COUNT),
      description: getDescription(DESCRIPTION)
    };
  }
  return pictures;
};

getPicturesArray(OBJECTS_COUNT);

/*
2,
3 шаблон и отрисовка
*/
var picturesRender = function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var pictureList = document.querySelector('.pictures');

  for (var i = 0; i < pictures.length; i++) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = pictures[i].url;
    pictureElement.querySelector('.picture__stat--likes').textContent = pictures[i].likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = pictures[i].comments.length;

    pictureList.appendChild(pictureElement);
  }
};
picturesRender();

/*
4 показать .big-picture
*/
var bigPictureRender = function () {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  var bigPictureSrc = bigPicture.querySelector('.big-picture__img img');
  bigPictureSrc.src = pictures[0].url;

  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  bigPictureLikes.textContent = pictures[0].likes;

  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  bigPictureCommentsCount.textContent = pictures[0].comments.length;

  var addComment = function () {
    var comment = '';
    for (var i = 0; i < pictures[0].comments.length; i++) {
      comment += '<li class="social__comment social__comment--text">' +
      '<img class="social__picture" src="img/avatar-' + getRandomInteger(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">'
      + pictures[0].comments[i] +
      '</li>';
    }
    return comment;
  };

  var bigPictureUl = bigPicture.querySelector('.social__comments');

  while (bigPictureUl.hasChildNodes()) {
    bigPictureUl.removeChild(bigPictureUl.firstChild);
  }

  bigPictureUl.insertAdjacentHTML('afterbegin', addComment());
};

bigPictureRender();
/*
5 спрятать счетчик и новые комментарии
*/

var commentCount = document.querySelector('.social__comment-count');
commentCount.classList.add('.visually-hidden');

var commentLoadMore = document.querySelector('.social__comment-loadmore');
commentLoadMore.classList.add('.visually-hidden');
