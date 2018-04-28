'use strict';

(function () {
  window.util = {
    getRandomInteger: function (min, max) {
      max += 1;
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getRandomSorting: function (arr) {
      arr.sort(function () {
        return 0.5 - Math.random();
      });
      return arr;
    }
  }

})();
