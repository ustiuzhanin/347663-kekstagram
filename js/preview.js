'use strict';

/*
превью
*/

(function () {
  window.prewiev = function () {
    var picture = document.querySelectorAll('.picture__link');
    var bigPicture = document.querySelector('.big-picture');
    var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
    var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
    var bigPictureLikes = bigPicture.querySelector('.likes-count');

    var commentCount = document.querySelector('.social__comment-count');
    commentCount.classList.add('visually-hidden');

    var commentLoadMore = document.querySelector('.social__comment-loadmore');
    commentLoadMore.classList.add('visually-hidden');

    var addComment = function () {
      var comment = '';
      for (var i = 0; i < window.picturesArray.length; i++) {
        for (var j = 0; j < window.picturesArray[i].comments.length; j++) {
          comment += '<li class="social__comment social__comment--text">' +
          '<img class="social__picture" src="img/avatar-' + window.util.getRandomInteger(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">'
          + window.picturesArray[i].comments[j] +
          '</li>';
        }

      }
      return comment;
    };
    addComment();

    var bigPictureUl = bigPicture.querySelector('.social__comments');

    while (bigPictureUl.hasChildNodes()) {
      bigPictureUl.removeChild(bigPictureUl.firstChild);
    }

    bigPictureUl.insertAdjacentHTML('afterbegin', addComment());


    var popupEscPress = function (evt) {
      if (evt.keyCode === window.util.keyCodes.escape) {
        closePicturePopup();
      }
    };
    var openPicturePopup = function (evt) {
      evt.preventDefault();
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

  };


})();
