'use strict';

(function () {

  var FORM = document.querySelector('.img-upload__form');

  var EFFECT_CONTROL_WRAPPER = FORM.querySelector('.effect-level');

  var EFFECT_LINE = EFFECT_CONTROL_WRAPPER.querySelector('.effect-level__line');

  var EFFECT_CONTROLLER = EFFECT_CONTROL_WRAPPER.querySelector('.effect-level__pin');

  var hideControlBlock = function (image, controller) {
    if (image.classList.contains(window.redactor.StyleEffect.NONE)) {
      controller.setAttribute('hidden', 'hidden');
    } else if (image.hasAttribute('class') === false) {
      controller.setAttribute('hidden', 'hidden');
    } else if (image.hasAttribute('class') === true) {
      controller.removeAttribute('hidden');
    }
  };

  var Position = function (x, y) {
    this.x = x;
    this.y = y;
  };

  var setLimit = function (currentPosition, max, min) {
    if (currentPosition < min) {
      return min;
    } else if (currentPosition > max) {
      return max;
    }
    return currentPosition;
  };

  Position.prototype.setXY = function (x, y) {
    this.x = x;
    this.y = y;
  };

  var controllerMouseEventHandler = function (evt) {
    var EffectLineBorder = {
      BOTTOM: EFFECT_LINE.offsetHeight,
      TOP: EFFECT_LINE.offsetTop,
      LEFT: EFFECT_LINE.offsetLeft,
      RIGHT: EFFECT_LINE.offsetWidth,
      CONTROLLER_SIZE: EFFECT_CONTROLLER.offsetWidth,
    };

    var ControllerBorder = {
      X_MAX: EffectLineBorder.RIGHT,
      X_MIN: EffectLineBorder.LEFT - EffectLineBorder.CONTROLLER_SIZE,
      Y_MAX: EffectLineBorder.BOTTOM / 2,
      Y_MIN: EffectLineBorder.BOTTOM / 2,
    };

    evt.preventDefault();

    var startCoordinates = new Position(evt.clientX, evt.clientY);

    var mouseMoveHandler = function (moveEvt) {

      moveEvt.preventDefault();

      var shift = new Position(startCoordinates.x - moveEvt.clientX, startCoordinates.y - moveEvt.clientY);

      startCoordinates.setXY(moveEvt.clientX, moveEvt.clientY);

      var MAX_PERCENT = 100;

      var convertPositionValue = function (coordinates) {
        return Math.floor((coordinates * EFFECT_LINE.offsetWidth) / MAX_PERCENT);
      };

      var prepareProperties = function (method) {
        return method.filter.slice(0, method.filter.length - 3);
      };

      var changeSaturation = function (coordinates) {
        window.loader.PHOTO_LOCATION.style = 'filter: ' + prepareProperties(getComputedStyle(window.loader.PHOTO_LOCATION))
          + '(' + convertPositionValue(coordinates) + '%);';
      };

      var EffectClass = {
        'effects__preview--chrome': changeSaturation,
        'effects__preview--sepia': changeSaturation,
        'effects__preview--marvin': changeSaturation,
        'effects__preview--phobos': changeSaturation,
        'effects__preview--heat': changeSaturation,
      };

      var setSaturation = function (coordinates) {
        for (var i in EffectClass) {
          if (window.loader.PHOTO_LOCATION.classList.contains(i)) {
            changeSaturation(coordinates);
          }
        }
      };

      var actualCoordinates = new Position(setLimit(EFFECT_CONTROLLER.offsetLeft - shift.x,
        ControllerBorder.X_MAX, ControllerBorder.X_MIN), setLimit(EFFECT_CONTROLLER.offsetTop - shift.y,
        ControllerBorder.Y_MAX, ControllerBorder.Y_MIN));

      setSaturation(actualCoordinates.x);

      EFFECT_CONTROLLER.style.left = actualCoordinates.x + 'px';
      EFFECT_CONTROLLER.style.top = actualCoordinates.y + 'px';
    };

    var mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  EFFECT_CONTROLLER.addEventListener('mousedown', controllerMouseEventHandler);

  hideControlBlock(window.loader.PHOTO_LOCATION, EFFECT_CONTROL_WRAPPER);

  window.controller = {
    hideControlBlock: hideControlBlock,
    EFFECT_CONTROLLER: EFFECT_CONTROLLER
  };
}());
