'use strict';

/*
   отрисовка миниатюры
*/

(function () {

  var imageFilters = document.querySelector('.img-filters');
  var sortingBtns = imageFilters.querySelectorAll('.img-filters__button');
  var popularSortBtn = imageFilters.querySelector('#filter-popular');
  var discussedSortBtn = imageFilters.querySelector('#filter-discussed');
  var randomSortBtn = imageFilters.querySelector('#filter-new');
  var activeButton = 'img-filters__button--active';
  var pictures = [];
  var sortedPictures = [];

  var sortPicturesPopular = function (data) {
    sortedPictures = data;
    sortedPictures = data.slice().sort(function (a, b) {
      return b.likes - a.likes;
    });
    return sortedPictures;
  };

  var sortPicturesComments = function (data) {
    sortedPictures = data.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return sortedPictures;
  };

  var sortPicturesRandom = function (data) {
    sortedPictures = data.sort(function () {
      return Math.random();
    });
    return sortedPictures;
  };

  var sortPictures = function (data) {

    if (popularSortBtn.classList.contains(activeButton)) {
      sortPicturesPopular(data);
    } else if (discussedSortBtn.classList.contains(activeButton)) {
      sortPicturesComments(data);
    } else if (randomSortBtn.classList.contains(activeButton)) {
      sortPicturesRandom(data);
    }
    picturesRender(sortedPictures);

  };

  var changeSorting = function () {
    for (var i = 0; i < sortingBtns.length; i++) {
      sortingBtns[i].addEventListener('click', function (evt) {
        document.querySelectorAll('.picture__link').forEach(function (item) {
          item.remove();
        });

        sortingBtns.forEach(function (photoSortingBtn) {
          photoSortingBtn.classList.remove(activeButton);
        });

        evt.target.classList.add(activeButton);

        window.util.debounce(sortPictures(pictures));

      });
    }
  };

  var picturesRender = function (data) {
    var picturesFragment = document.createDocumentFragment();
    var pictureTemplate = document.querySelector('#picture').content;
    var pictureList = document.querySelector('.pictures');

    for (var i = 0; i < pictures.length; i++) {
      var pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.querySelector('.picture__img').src = data[i].url;

      pictureElement.querySelector('.picture__stat--likes').textContent = data[i].likes;
      pictureElement.querySelector('.picture__stat--comments').textContent = data[i].comments.length;
      pictureElement.querySelector('.picture__link').dataset.number = i;

      picturesFragment.appendChild(pictureElement);
    }
    pictureList.appendChild(picturesFragment);
  };

  var onSuccesHandler = function (data) {
    pictures = data;
    picturesRender(pictures);
    changeSorting();

    window.preview(pictures);
    popularSortBtn.classList.remove(activeButton);
    imageFilters.classList.remove('img-filters--inactive');

  };

  var onErrorHandler = function (message) {
    var errElement = document.createElement('div');

    errElement.classList.add('pictures-load-error');
    errElement.textContent = message;
    document.body.appendChild(errElement);
  };

  window.backend.load(onSuccesHandler, onErrorHandler);
})();
