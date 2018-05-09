'use strict';

/*
  отрытие/закрытие окна загрузки изображений
*/

(function () {

  var filesUpload = document.querySelector('#upload-file');
  var filesUploadOverlay = document.querySelector('.img-upload__overlay');
  var cancelUnloadButton = filesUploadOverlay.querySelector('.cancel');

  var onEscPress = function (evt) {
    if (evt.keyCode === window.util.keyCodes.escape) {
      filesUpload.value = '';
      onUploadPopupClose();
    }
  };

  var onUnloadPopupOpen = function () {
    var uploadScale = filesUploadOverlay.querySelector('.scale');
    var uploadDefaultEffect = filesUploadOverlay.querySelector('#effect-none');

    uploadScale.classList.add('hidden');
    uploadDefaultEffect.checked = 'true';

    filesUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
  };

  var onUploadPopupClose = function () {
    filesUploadOverlay.classList.add('hidden');
    window.form.resetStyles();
    document.removeEventListener('keydown', onEscPress);
  };

  filesUpload.addEventListener('change', onUnloadPopupOpen);
  cancelUnloadButton.addEventListener('click', onUploadPopupClose);

  window.gallery = {
    close: onUploadPopupClose,
    open: onUnloadPopupOpen
  };
})();
