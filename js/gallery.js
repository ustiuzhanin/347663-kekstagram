'use strict';

/*
  отрытие/закрытие окна загрузки изображений
*/

(function () {

  var filesUpload = document.querySelector('#upload-file');
  var filesUploadOverlay = document.querySelector('.img-upload__overlay');
  var cancelUnloadButton = document.querySelector('.cancel');

  var resetFormStyles = function () {
    window.form.imagePreview.classList.remove(window.form.imagePreview.classList[1]);
    window.form.imagePreview.style.filter = 'none';
    window.form.imagePreview.style.transform = 'none';
  };

  var escPress = function (evt) {
    if (evt.keyCode === window.util.keyCodes.escape) {
      filesUpload.value = '';
      closeUnloadPopup();
    }
  };

  var openUnloadPopup = function () {
    var uploadScale = document.querySelector('.scale');
    var uploadDefaultEffect = document.querySelector('#effect-none');

    uploadScale.classList.add('hidden');
    uploadDefaultEffect.checked = 'true';

    filesUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', escPress);
  };

  var closeUnloadPopup = function () {
    filesUploadOverlay.classList.add('hidden');
    resetFormStyles();
    document.removeEventListener('keydown', escPress);
  };

  filesUpload.addEventListener('change', openUnloadPopup);
  cancelUnloadButton.addEventListener('click', closeUnloadPopup);

  window.gallery = {
    close: closeUnloadPopup,
    open: openUnloadPopup
  };
})();
