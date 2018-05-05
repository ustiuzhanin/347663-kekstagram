'use strict';

/*
превью
*/

(function () {
  window.preview = function (picturesData) {
    var picture = document.querySelectorAll('.picture__link');
    var bigPicture = document.querySelector('.big-picture');
    var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
    var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
    var bigPictureLikes = bigPicture.querySelector('.likes-count');
    var bigPictureDescription = bigPicture.querySelector('.social__caption');
    var bigPictureCommentsList = bigPicture.querySelector('.social__comments');

    var commentCount = bigPicture.querySelector('.social__comment-count');
    commentCount.classList.add('visually-hidden');

    var commentLoadMore = bigPicture.querySelector('.social__comment-loadmore');
    commentLoadMore.classList.add('visually-hidden');

    var addComment = function (number) {
      var comment = '';

      while (bigPictureCommentsList.hasChildNodes()) {
        bigPictureCommentsList.removeChild(bigPictureCommentsList.firstChild);
      }

      for (var i = 0; i < picturesData[number].comments.length; i++) {
        comment += '<li class="social__comment social__comment--text">' +
        '<img class="social__picture" src="img/avatar-' + window.util.getRandomInteger(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">'
        + picturesData[number].comments[i] +
        '</li>';
      }
      return comment;
    };

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
      bigPictureDescription.textContent = picturesData[evt.currentTarget.dataset.number].comments[0];
      bigPictureCommentsList.insertAdjacentHTML('afterbegin', addComment(evt.currentTarget.dataset.number));

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
