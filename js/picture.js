'use strict';

/*
   отрисовка миниатюры
*/

(function () {

  var picturesArray = [];

  var onSuccesHandler = function (data) {
    var pictureTemplate = document.querySelector('#picture').content;
    var pictureList = document.querySelector('.pictures');
    picturesArray = data;

    for (var i = 0; i < picturesArray.length; i++) {
      var pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.querySelector('.picture__img').src = picturesArray[i].url;

      pictureElement.querySelector('.picture__stat--likes').textContent = picturesArray[i].likes;
      pictureElement.querySelector('.picture__stat--comments').textContent = picturesArray[i].comments.length;
      pictureElement.querySelector('.picture__link').dataset.number = i;

      pictureList.appendChild(pictureElement);
    }
    window.preview(picturesArray);
  };

  var onErrorHandler = function (message) {
    var errElement = document.createElement('div');

    errElement.classList.add('pictures-load-error');
    errElement.textContent = message;
    document.body.appendChild(errElement);
  };

  window.backend.load(onSuccesHandler, onErrorHandler);
})();
