'use strict';

(function () {

  var GET_URL = 'https://js.dump.academy/kekstagram/data';
  var POST_URL = 'https://js.dump.academy/kekstagram';
  var XHR_TIMEOUT = 10000;

  var OK = 200;
  var REQUEST_ERROR = 400;
  var RIGHTS_ERROR = 401;
  var NOT_FOUND_ERROR = 404;

  var loadData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = XHR_TIMEOUT;

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case OK:
          onLoad(xhr.response);
          break;
        case REQUEST_ERROR:
          error = 'Неверный запрос';
          break;
        case RIGHTS_ERROR:
          error = 'Пользователь не авторизирован';
          break;
        case NOT_FOUND_ERROR:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', GET_URL);
    xhr.send();
  };

  var postData = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = XHR_TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === OK) {
        onLoad('Данные успешно отправлены');
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.open('POST', POST_URL);
    xhr.send(data);
  };

  window.backend = {
    load: loadData,
    send: postData
  };
})();
