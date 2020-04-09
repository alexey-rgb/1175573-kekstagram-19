'use strict';

(function () {

  // случайное число

  var getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // добавляет/убирает css класс

  var addRemoveClass = function (node, styleClass, flag) {
    if (flag === 1) {
      return node.classList.add(styleClass);
    } else if (flag === 0) {
      return node.classList.remove(styleClass);
    }
  };

  // отдает случайный комментарий

  var getOneComment = function (minNumber, maxNumber) {
    return {
      avatar: 'img/avatar-' + getRandomNumber(minNumber + 1, maxNumber) + '.svg',
      message: window.data.MESSAGES[getRandomNumber(minNumber, maxNumber - 1)],
      name: window.data.USERS_NAMES[getRandomNumber(minNumber, maxNumber - 1)],
    };
  };

  // отдает массив случайных комментариев

  var getRandomComments = function () {
    var items = [];
    var count = getRandomNumber(window.data.Numbers.MIN_COMMENT, window.data.COUNT_FOR_COMMENTS);
    for (var j = 0; j < count; j++) {
      items.push(
        getOneComment(j, window.data.COUNT_FOR_COMMENTS),
      );
    }
    return items;
  };

  window.util = {
    getNumber: getRandomNumber,
    getComments: getRandomComments,
    addRemoveClass: addRemoveClass,
  };
}());
