'use strict';

/*
   отрисовка миниатюры
*/

(function () {

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var pictureList = document.querySelector('.pictures');

  for (var i = 0; i < window.data.pictures.length; i++) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = window.data.pictures[i].url;
    pictureElement.querySelector('.picture__stat--likes').textContent = window.data.pictures[i].likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = window.data.pictures[i].comments.length;

    pictureList.appendChild(pictureElement);
  }

})();
