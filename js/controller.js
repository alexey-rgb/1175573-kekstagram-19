'use strict';

(function () {
  var REDACTOR_WRAPPER = document.querySelector('.img-upload__overlay');

  var FORM = document.querySelector('.img-upload__form');

  var EFFECT_CONTROL_WRAPPER = FORM.querySelector('.effect-level');

  var EFFECT_LINE = EFFECT_CONTROL_WRAPPER.querySelector('.effect-level__line');

  var EFFECT_CONTROLLER = EFFECT_CONTROL_WRAPPER.querySelector('.effect-level__pin');

  // конструктор для записи актуальных координат пина
  // на шкале регулировки глубины эффекта(в поле редактирования фотографии)

  var Position = function (x, y) {
    this.x = x;
    this.y = y;
  };

  //  устанавливает ограничения на перемещение пина по шкале регулировки глубины эффекта
  //(в поле редактирования фотографии)

  var setLimit = function (currentPosition, max, min) {
    if (currentPosition < min) {
      return min;
    } else if (currentPosition > max) {
      return max;
    }
    return currentPosition;
  };

  // позволяет обновлять актуальные координаты

  Position.prototype.setXY = function (x, y) {
    this.x = x;
    this.y = y;
  };

  // обработчик на клику на пин на шкале регулировки глубины эффекта
  //(в поле редактирования фотографии)

  var controllerMouseEventHandler = function (evt) {

    // размеры шкалы регулировки глубины эффекта и пина на ней.

    var EffectLineBorder = {
      BOTTOM: EFFECT_LINE.offsetHeight,
      TOP: EFFECT_LINE.offsetTop,
      LEFT: EFFECT_LINE.offsetLeft,
      RIGHT: EFFECT_LINE.offsetWidth,
      CONTROLLER_SIZE: EFFECT_CONTROLLER.offsetWidth,
    };

    // крайние точки перемещия пина по осям X,Y

    var ControllerBorder = {
      X_MAX: EffectLineBorder.RIGHT,
      X_MIN: EffectLineBorder.LEFT - EffectLineBorder.CONTROLLER_SIZE,
      Y_MAX: EffectLineBorder.BOTTOM / 2,
      Y_MIN: EffectLineBorder.BOTTOM / 2,
    };

    // запрещаем дефолтный переход на страницу сервера

    evt.preventDefault();

    //  координаты в момент нажатия на пин

    var startCoordinates = new Position(evt.clientX, evt.clientY)

    // обработчик на перемещение мышки

    var mouseMoveHandler = function (moveEvt) {

      moveEvt.preventDefault();

      // смещение(учитывается положение мышки относительно перемещаемого блока)

      var shift = new Position(startCoordinates.x - moveEvt.clientX, startCoordinates.y - moveEvt.clientY);

      // обновляются координаты пина при перемещени

      startCoordinates.setXY(moveEvt.clientX, moveEvt.clientY);

      // ипользуется для css, как верхняя граница насыщенности текущего эффекта, а именно:
      // grayscale, invert, sepia

      var MAX_PERCENT = 100;

      // ипользуется для css, как верхние границы насыщенности указанных эффектов:

      var MaxNumbers = {
        BLUR: 10,
        BRIGHTNESS: 100
      };

      // получая актуальные координаты пина в аргумент, вычисляется процентное
      // или иное отошение(в зависимости от типа эфеекта) к длине шкалы накладывания эффекта(что есть 100%)
      // и затем это отношение подставляется в соответсвтующий стиль, определяющийся методом getComputedStyle()

      var convertPositionValue = function (coordinates) {
        if (getComputedStyle(window.loader.PHOTO_LOCATION).filter.includes('grayscale')) {
          window.loader.PHOTO_LOCATION.style =
            'filter: grayscale(' + (Math.floor((coordinates * MAX_PERCENT) / EFFECT_LINE.offsetWidth)) + '%);';
        } else if (getComputedStyle(window.loader.PHOTO_LOCATION).filter.includes('blur')) {
          window.loader.PHOTO_LOCATION.style =
            'filter: blur(' + Math.floor((coordinates * MaxNumbers.BLUR) / EFFECT_LINE.offsetWidth) + 'px);'
        } else if (getComputedStyle(window.loader.PHOTO_LOCATION).filter.includes('brightness')) {
          window.loader.PHOTO_LOCATION.style =
            'filter: brightness(' + (Math.floor((coordinates * MaxNumbers.BRIGHTNESS) / EFFECT_LINE.offsetWidth)) + '%);';
        } else if (getComputedStyle(window.loader.PHOTO_LOCATION).filter.includes('invert')) {
          window.loader.PHOTO_LOCATION.style =
            'filter: invert(' + Math.floor((coordinates * MAX_PERCENT) / EFFECT_LINE.offsetWidth) + '%);'
        } else if (getComputedStyle(window.loader.PHOTO_LOCATION).filter.includes('sepia')) {
          window.loader.PHOTO_LOCATION.style =
            'filter: sepia(' + Math.floor((coordinates * MAX_PERCENT) / EFFECT_LINE.offsetWidth) + '%);'
        }
      };

      // css классы эффектов

      var EffectClass = ['effects__preview--chrome', 'effects__preview--phobos', 'effects__preview--sepia',
        'effects__preview--marvin', 'effects__preview--heat'];

      // у редактируемой фотографии проверяется актуальный класс
      // и если он соответствует одному из вышеперечисленных эффектов,
      // то вызывается функция управления глубиной соотв. эффекта.

      var setSaturation = function (coordinates) {
        EffectClass.forEach(function (v) {
          if (window.loader.PHOTO_LOCATION.classList.contains(v)) {
            convertPositionValue(coordinates);
          }
        })
      };

      // объект, содержащий актуальные координаты пина с учетом его границ перемещения.

      var actualCoordinates = new Position(setLimit(EFFECT_CONTROLLER.offsetLeft - shift.x,
        ControllerBorder.X_MAX, ControllerBorder.X_MIN), setLimit(EFFECT_CONTROLLER.offsetTop - shift.y,
          ControllerBorder.Y_MAX, ControllerBorder.Y_MIN));

      // передача актуальных координат, для управления глубиной эффекта

      setSaturation(actualCoordinates.x);

      // записываем в стили текущее положение пина

      EFFECT_CONTROLLER.style.left = actualCoordinates.x + 'px';
      EFFECT_CONTROLLER.style.top = actualCoordinates.y + 'px';
    };

    // снимаем обработчики при событии mouseup

    var mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  // вешаем пину обработчик, для изменения глубины эффекта, накладываемого на фотографию

  EFFECT_CONTROLLER.addEventListener('mousedown', controllerMouseEventHandler);

  // прячем шкалу регулировки глубины эффекта, в случае если эффект не выбран

  window.util.hideControlBlock(window.loader.PHOTO_LOCATION, EFFECT_CONTROL_WRAPPER);

  window.controller = {
    EFFECT_CONTROLLER: EFFECT_CONTROLLER,
    EFFECT_CONTROL_WRAPPER: EFFECT_CONTROL_WRAPPER,
    FORM: FORM
  };
}());
