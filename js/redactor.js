'use strict';

(function () {

  var StyleEffect = {
    NONE: 'effects__preview--none',
    CHROME: 'effects__preview--chrome',
    SEPIA: 'effects__preview--sepia',
    MARVIN: 'effects__preview--marvin',
    PHOBOS: 'effects__preview--phobos',
    HEAT: 'effects__preview--heat',
  };

  var EFFECT_CONTROL_WRAPPER = document.querySelector('.effect-level');

  var PHOTO_LOCATION = document.querySelector('.img-upload__preview img');

  var EFFECTS_LIST = document.querySelector('.effects__list');

  var SCALE_CONTROL_WRAPPER = document.querySelector('.img-upload__scale');

  var condition = {
    max: '100%',
    min: '25%',
    condition: 'disabled',
    attribute: 'disabled',
    SIZE_INTERFACE: SCALE_CONTROL_WRAPPER.children[1],
    LEFT_SIZE_CONTROLLER: SCALE_CONTROL_WRAPPER.children[0],
    RIGHT_SIZE_CONTROLLER: SCALE_CONTROL_WRAPPER.children[2],
  };

  // устанавливает макс/мин значения масштабирования фото(значение отображается в % в интерфейсе поля-редактирования фотографии)

  var checkLimitValue = function (arg) {
    if (arg.SIZE_INTERFACE.value === arg.max) {
      arg.RIGHT_SIZE_CONTROLLER.setAttribute(arg.attribute, arg.condition);
    } else if (arg.SIZE_INTERFACE.value === arg.min) {
      arg.LEFT_SIZE_CONTROLLER.setAttribute(arg.attribute, arg.condition);
    }
  };

  // необходимо для отображения корректного value, в случае если равно ***%(а именно 100%) то есть все остальные значения выглядят так **%
  // по тз лимит от 25%-100%

  var controlValueLength = function () {
    return condition.SIZE_INTERFACE.value.length === 3 ? Number(condition.SIZE_INTERFACE.value.slice(0, 2)) - 25 + '%'
      : Number(condition.SIZE_INTERFACE.value.slice(0, 3)) - 25 + '%';
  };

  // отображает масштаб фотографии в поле редактирования фото, в зависимости от того на какой кнопке событие

  var setScaleValue = function (evt) {
    switch (evt.target) {
      case condition.LEFT_SIZE_CONTROLLER:
        condition.SIZE_INTERFACE.value = controlValueLength();
        condition.RIGHT_SIZE_CONTROLLER.removeAttribute('disabled');
        break;
      case condition.RIGHT_SIZE_CONTROLLER:
        condition.SIZE_INTERFACE.value = Number(condition.SIZE_INTERFACE.value.slice(0, 2)) + 25 + '%';
        condition.LEFT_SIZE_CONTROLLER.removeAttribute('disabled');
        break;
    }
  };

  var StyleSize = {
    '25%': 'scale(0.25)',
    '50%': 'scale(0.50)',
    '75%': 'scale(0.75)',
    '100%': 'scale(1)',
  };

  // вызывает вышеупомянутые функции в случае изменения масштаба фото

  var scaleButtonClickHandler = function (evt) {
    setScaleValue(evt);
    checkLimitValue(condition);
    window.loader.PHOTO_LOCATION.style.transform = StyleSize[condition.SIZE_INTERFACE.value];
  };

  var result;

  var removeUnnecessaryClass = function (evt) {
    for (var style in StyleEffect) {
      if (StyleEffect[evt.target.value.toUpperCase()] !== StyleEffect[style]) {
        result = StyleEffect[style];
        if (window.loader.PHOTO_LOCATION.classList.contains(result)) {
          window.loader.PHOTO_LOCATION.classList.remove(result);
        }
      }
    }
  };

  // накладывает эффект на фотографию

  var effectsListClickHandler = function (evt) {
    window.loader.PHOTO_LOCATION.classList.add(StyleEffect[evt.target.value.toUpperCase()]);
    removeUnnecessaryClass(evt);
    window.controller.hideControlBlock(PHOTO_LOCATION, EFFECT_CONTROL_WRAPPER);
    window.controller.EFFECT_CONTROLLER.style = 'left: 100%';
  };

  checkLimitValue(condition);

  window.redactor = {
    SCALE_CONTROL_WRAPPER: SCALE_CONTROL_WRAPPER,
    EFFECTS_LIST: EFFECTS_LIST,
    scaleButtonClickHandler: scaleButtonClickHandler,
    effectsListClickHandler: effectsListClickHandler,
    StyleEffect: StyleEffect,
  };
}());
