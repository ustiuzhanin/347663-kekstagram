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

    var createElement = function (newTag, newClass) {
      var element = document.createElement(newTag);
      element.className = newClass;
      return element;
    };

    var createComment = function (comment) {
      var commentItem = createElement('li', 'social__comment social__comment--text');
      var commentAvatar = createElement('img', 'social__picture');
      var commentText;

      commentAvatar.src = 'img/avatar-' + window.util.getRandomInteger(1, 6) + '.svg';
      commentText = document.createTextNode(comment);
      commentItem.appendChild(commentAvatar);
      commentItem.appendChild(commentText);

      return commentItem;
    };

    var addComment = function (number) {
      var commentsFragment = document.createDocumentFragment();

      while (bigPictureCommentsList.hasChildNodes()) {
        bigPictureCommentsList.removeChild(bigPictureCommentsList.firstChild);
      }

      for (var i = 1; i < picturesData[number].comments.length; i++) {
        commentsFragment.appendChild(createComment(picturesData[number].comments[i]));
      }

      return commentsFragment;
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
      bigPictureCommentsList.appendChild(addComment(evt.currentTarget.dataset.number));

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
