'use strict';

(function () {

  // случайное число

  var getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // возвращает случайный комментарий

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
    var count = getRandomNumber(window.data.Numbers.MIN_COMMENT, window.data.Numbers.MAX_COMMENT);
    for (var j = 0; j < count; j++) {
      items.push(
        getOneComment(j, window.data.Numbers.MAX_COMMENT),
      );
    }
    return items;
  };

  // скрывает блок управления глубиной эффекта в поле редактирования фотографии

  var hideControlBlock = function (image, controller, evt) {
    if (image.classList.contains(window.redactor.StyleEffect.NONE)) {
      return controller.setAttribute('hidden', 'hidden');
    } else if (image.hasAttribute('class') === false) {
      controller.setAttribute('hidden', 'hidden');
    } else if (image.hasAttribute('class') === true) {
      controller.removeAttribute('hidden');
    } else if (evt === 'keydown' || evt === 'click') {
      controller.setAttribute('hidden', 'hidden');
    }
  };

  window.util = {
    getNumber: getRandomNumber,
    getComments: getRandomComments,
    hideControlBlock: hideControlBlock
  };

}());
