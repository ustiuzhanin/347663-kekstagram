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

var ESC_KEYCODE = 27;

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
  шаблон и отрисовка
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
  показать .big-picture
*/

var bigPictureRender = function () {
  var bigPicture = document.querySelector('.big-picture');

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
  спрятать счетчик и новые комментарии
*/

var commentCount = document.querySelector('.social__comment-count');
commentCount.classList.add('.visually-hidden');

var commentLoadMore = document.querySelector('.social__comment-loadmore');
commentLoadMore.classList.add('.visually-hidden');

/*
  загрузка изображения и показ формы редактирования
*/

var filesUpload = document.querySelector('#upload-file');
var filesUploadOverlay = document.querySelector('.img-upload__overlay');
var cancelUnloadButton = document.querySelector('.cancel');

var escPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    filesUpload.value = '';
    closeUnloadPopup();
  }
};

var openUnloadPopup = function () {
  var uploadScale = document.querySelector('.scale');
  var uploadDefaultEffect = document.querySelector('#effect-none');

  uploadScale.classList.add('hidden');
  uploadDefaultEffect.checked = 'true';

  filesUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', escPress);
};

var closeUnloadPopup = function () {
  filesUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', escPress);
};

filesUpload.addEventListener('change', openUnloadPopup);
cancelUnloadButton.addEventListener('click', closeUnloadPopup);

/*
  применение эффектов к изображению
*/

var changeUploadImgSettings = function () {

  var imageUploadPreview = document.querySelector('.img-upload__preview');

  var imageUploadScale = document.querySelector('.scale');
  var imageUploadScalePin = imageUploadScale.querySelector('.scale__pin');
  var imageUploadScaleValue = imageUploadScale.querySelector('.scale__value');
  var imageUploadScaleLine = imageUploadScale.querySelector('.scale__line');
  var imageUploadScaleLevel = imageUploadScale.querySelector('.scale__level');
  var currentEffect = '';

  var pictureZoom = document.querySelector('.resize');
  var pictureZoomPlus = pictureZoom.querySelector('.resize__control--plus');
  var pictureZoomMinus = pictureZoom.querySelector('.resize__control--minus');
  var pictureZoomValue = pictureZoom.querySelector('.resize__control--value');
  var zoomValue = 100;
  pictureZoomValue.value = zoomValue + '%';
  pictureZoom.style.zIndex = '1';

  /*
    фильтр
  */

  var imageEffect = document.querySelectorAll('.effects__radio');
  for (var i = 0; i < imageEffect.length; i++) {
    imageEffect[i].addEventListener('click', function (evt) {
      currentEffect = evt.target.value;
      imageUploadPreview.style = '';
      imageUploadScalePin.style = 'left: 100%';
      imageUploadScaleLevel.style = 'width: 100%';
      imageUploadScaleValue.value = '100';
      pictureZoomValue.value = '100%';
      zoomValue = 100;

      for (var j = 0; j < imageEffect.length; j++) {
        imageUploadPreview.classList.remove('effects__preview--' + imageEffect[j].value);
      }
      if (evt.target.value !== 'none') {
        imageUploadScale.classList.remove('hidden');
        imageUploadPreview.classList.add('effects__preview--' + evt.target.value);
      } else {
        imageUploadScale.classList.add('hidden');
      }
    });
  }

  /*
    насыщенность фильтра
  */

  imageUploadScaleLine.addEventListener('click', function (evt) {
    var clickPositionX = evt.offsetX;
    var scalePositionProportion = Math.round(clickPositionX / imageUploadScaleLine.offsetWidth * 100);

    imageUploadScalePin.style = 'left: ' + scalePositionProportion + '%';
    imageUploadScaleLevel.style = 'width: ' + scalePositionProportion + '%';
    imageUploadScaleValue.value = scalePositionProportion;

    var changeFilters = function (min, max) {
      var scaleProportionStyle = clickPositionX / imageUploadScaleLine.offsetWidth;
      var value = max - min;
      var filterValue = scaleProportionStyle * value + min;
      return filterValue;
    };

    switch (currentEffect) {
      case 'chrome':
        imageUploadPreview.style = 'filter: grayscale(' + changeFilters(0, 1) + ')';
        break;
      case 'sepia':
        imageUploadPreview.style = 'filter: sepia(' + changeFilters(0, 1) + ')';
        break;
      case 'marvin':
        imageUploadPreview.style = 'filter: invert(' + changeFilters(0, 100) + '%)';
        break;
      case 'phobos':
        imageUploadPreview.style = 'filter: blur(' + changeFilters(0, 3) + 'px)';
        break;
      case 'heat':
        imageUploadPreview.style = 'filter: brightness(' + changeFilters(1, 3) + ')';
        break;
    }
  });

  /*
    зум
  */

  var pictureZoomIn = function () {
    if (zoomValue < 100) {
      zoomValue += 25;
      pictureZoomValue.value = zoomValue + '%';
      imageUploadPreview.style.transform = 'scale(' + zoomValue / 100 + ')';
    }
  };

  var pictureZoomOut = function () {
    if (zoomValue > 25) {
      zoomValue -= 25;
      pictureZoomValue.value = zoomValue + '%';
      imageUploadPreview.style.transform = 'scale(' + zoomValue / 100 + ')';
    }
  };

  pictureZoomPlus.addEventListener('click', pictureZoomIn);
  pictureZoomMinus.addEventListener('click', pictureZoomOut);

};
changeUploadImgSettings();

/*
  проверка хэштегов на валидность, отмеза закрытия на esc
*/

var checkRepeatingHashtags = function (arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    var str = arr[i].toLowerCase();
    for (var j = 0; j < result.length; j++) {
      if (result[j].toLowerCase() === str) {
        return true;
      }
    }
    result.push(str);
  }
  return false;
}

var uploadHashtags = filesUploadOverlay.querySelector('.text__hashtags');
var uploadDescription = filesUploadOverlay.querySelector('.text__description');

var checkHashtagValidity = function () {

  var hashtagArray = uploadHashtags.value;
  var hashtagArraySplitted = hashtagArray.split(/\s+/g).filter(Boolean);

  var MIN_LENGTH = 2;
  var MAX_LENGTH = 20;
  var lengthError = 'Минимальная длина хэш-тега 2 символа, а максимальная 20';
  var typeError = 'Хэш-тег должен начинаться с # и состоять из букв, цифр или нижнего подчеркивания';
  var maxHashtagsError = 'Максимальное количество хэш-тегов - 5';
  var repeatError = 'Хэш-теги не должны повторятся';

  if (hashtagArraySplitted.length <= 5) {
    for (var i = 0; i < hashtagArraySplitted.length; i++) {
      if (hashtagArraySplitted[i].length < MIN_LENGTH || hashtagArraySplitted[i].length > MAX_LENGTH) {
        uploadHashtags.setCustomValidity(lengthError);
      } else if (!hashtagArraySplitted[i].match(/^#(\w)+$/g)) {
        uploadHashtags.setCustomValidity(typeError);
      } else if (checkRepeatingHashtags(hashtagArraySplitted)) {
        uploadHashtags.setCustomValidity(repeatError);
      } else {
        uploadHashtags.setCustomValidity('');
      }
    }
  } else {
    uploadHashtags.setCustomValidity(maxHashtagsError);
  }

};

uploadHashtags.addEventListener('input', checkHashtagValidity);

var escPressDisable = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
};

uploadHashtags.addEventListener('keydown', escPressDisable);
uploadDescription.addEventListener('keydown', escPressDisable);

/*
  показ изображения в полноэкранном режиме
*/

var picture = document.querySelectorAll('.picture__link');
var bigPicture = document.querySelector('.big-picture');
var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
var bigPictureLikes = bigPicture.querySelector('.likes-count');

var popupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePicturePopup();
  }
};
var openPicturePopup = function (evt) {
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = evt.currentTarget.querySelector('.picture__img').src;
  bigPictureLikes.textContent = evt.currentTarget.querySelector('.picture__stat--likes').textContent;

  document.addEventListener('keydown', popupEscPress);
};
var closePicturePopup = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPress);
};

for (var i = 0; i < picture.length; i++) {
  picture[i].addEventListener('click', openPicturePopup);
}
bigPictureClose.addEventListener('click', closePicturePopup);
