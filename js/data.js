'use strict';

(function () {

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
  массив из обьектов
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

  var getComments = function (arr, numberOfComments) {
    var newArr = [];
    var displayCommentsCount = window.util.getRandomInteger(1, numberOfComments);
    arr = window.util.getRandomSorting(arr);
    for (var i = 0; i < displayCommentsCount; i++) {
      newArr[i] = arr[i];
    }
    return newArr;
  };

  var getDescription = function (arr) {
    var newStr = '';
    var randomStr = window.util.getRandomInteger(0, arr.length - 1);
    newStr = arr[randomStr];
    return newStr;
  };

  var pictures = [];

  var getPicturesArray = function (number) {
    var picturesPath = getPicturesPath(number);
    for (var i = 0; i < number; i++) {
      pictures[i] = {
        url: picturesPath[i],
        likes: window.util.getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
        comments: getComments(COMMENTS, COMMENTS_COUNT),
        description: getDescription(DESCRIPTION)
      };
    }
    return pictures;
  };

  var picturesRender = getPicturesArray(OBJECTS_COUNT);

  window.data = {
    pictures: picturesRender,
    keyCodes: {
      escape: 27
    }
  }

})();
