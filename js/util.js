'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 10000;
  var lastTimeout;

  window.util = {
    getRandomInteger: function (min, max) {
      max += 1;
      return Math.floor(Math.random() * (max - min)) + min;
    },
    keyCodes: {
      escape: ESC_KEYCODE
    },
    debounce: function (fun) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
    }
  };

})();
