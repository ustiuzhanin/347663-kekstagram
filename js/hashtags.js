'use strict';

(function () {

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
    if (evt.keyCode === window.data.keyCodes.escape) {
      evt.stopPropagation();
    }
  };

  uploadHashtags.addEventListener('keydown', escPressDisable);
  uploadDescription.addEventListener('keydown', escPressDisable);

})();
