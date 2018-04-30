'use strict';

/*
  параметры загрузки изображения
*/

(function () {

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

  var getFilters = function () {

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

  };
  getFilters();

  /*
  насыщенность фильтра по перетаскиванию
  */

  var changeFiltersSaturation = function () {
    imageUploadScalePin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var sliderCoods = getCoords(imageUploadScaleLine);
      var pinCoods = getCoords(imageUploadScalePin);
      var shiftX = evt.pageX - pinCoods;

      var renderPictureEffect = function (renderEvt) {
        var positionX = renderEvt.pageX - shiftX - sliderCoods;
        if (positionX < 0) {
          positionX = 0;
        } else if (positionX > imageUploadScaleLine.offsetWidth) {
          positionX = imageUploadScaleLine.offsetWidth;
        }

        imageUploadScaleLevel.style.width = positionX + 'px';
        imageUploadScalePin.style.left = positionX + 'px';
        imageUploadScaleValue.value = positionX;

        applyFilters(currentEffect, positionX);
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        renderPictureEffect(moveEvt);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

    });

    var getCoords = function (elem) {
      var box = elem.getBoundingClientRect();

      return box.left + pageXOffset;
    };

    var changeFilters = function (min, max, position) {
      var scaleProportionStyle = position / imageUploadScaleLine.offsetWidth;
      var value = max - min;
      var filterValue = scaleProportionStyle * value + min;
      return filterValue;
    };

    var applyFilters = function (filter, position) {
      switch (filter) {
        case 'chrome':
          imageUploadPreview.style = 'filter: grayscale(' + changeFilters(0, 1, position) + ')';
          break;
        case 'sepia':
          imageUploadPreview.style = 'filter: sepia(' + changeFilters(0, 1, position) + ')';
          break;
        case 'marvin':
          imageUploadPreview.style = 'filter: invert(' + changeFilters(0, 100, position) + '%)';
          break;
        case 'phobos':
          imageUploadPreview.style = 'filter: blur(' + changeFilters(0, 3, position) + 'px)';
          break;
        case 'heat':
          imageUploadPreview.style = 'filter: brightness(' + changeFilters(1, 3, position) + ')';
          break;
      }
    };

  };
  changeFiltersSaturation();

  /*
  зум
  */

  var changeZoom = function () {

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
  changeZoom();

  /*
  hashtags
  */

  var checkHashtags = function () {

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
    };

    var uploadHashtags = document.querySelector('.text__hashtags');
    var uploadDescription = document.querySelector('.text__description');

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
      if (evt.keyCode === window.util.keyCodes.escape) {
        evt.stopPropagation();
      }
    };

    uploadHashtags.addEventListener('keydown', escPressDisable);
    uploadDescription.addEventListener('keydown', escPressDisable);

  };
  checkHashtags();

})();
