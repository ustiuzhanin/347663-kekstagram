'use strict';

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
    (function () {

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
    })();

    /*
       насыщенность фильтра по перетаскиванию
    */

    (function () {

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

    })();

    /*
      зум
    */

    (function () {

      var pictureZoom = document.querySelector('.resize');
      var pictureZoomPlus = pictureZoom.querySelector('.resize__control--plus');
      var pictureZoomMinus = pictureZoom.querySelector('.resize__control--minus');
      var pictureZoomValue = pictureZoom.querySelector('.resize__control--value');
      var zoomValue = 100;
      pictureZoomValue.value = zoomValue + '%';
      pictureZoom.style.zIndex = '1';

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

    })();

})();
