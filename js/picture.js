'use strict';

/*
   отрисовка миниатюры
*/

(function () {

  window.picturesArray = [];

  var onSuccesHandler = function (data) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
    var pictureList = document.querySelector('.pictures');
    window.picturesArray = data;

    for (var i = 0; i < window.picturesArray.length; i++) {
      var pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.querySelector('.picture__img').src = window.picturesArray[i].url;

      pictureElement.querySelector('.picture__stat--likes').textContent = window.picturesArray[i].likes;
      pictureElement.querySelector('.picture__stat--comments').textContent = window.picturesArray[i].comments.length;

      pictureList.appendChild(pictureElement);
    }
    window.prewiev();
  };

  var onErrorHandler = function (message) {
    console.error(message);
  };

  window.backend.load(onSuccesHandler, onErrorHandler);
})();
