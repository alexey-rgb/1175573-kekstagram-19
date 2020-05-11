'use strict';

(function () {

  // классы css, содержат стили эффектов, которые можно применить к загруженной пользователем фотографии

  var StyleEffect = {
    NONE: 'effects__preview--none',
    CHROME: 'effects__preview--chrome',
    SEPIA: 'effects__preview--sepia',
    MARVIN: 'effects__preview--marvin',
    PHOBOS: 'effects__preview--phobos',
    HEAT: 'effects__preview--heat',
  };

  // структура, позволяющая контролировать масштаб фотографии в зависимости, от текущего значения
  // поля(актуальный масштаб)

  var StyleSize = {
    '25%': 'scale(0.25)',
    '50%': 'scale(0.50)',
    '75%': 'scale(0.75)',
    '100%': 'scale(1)',
  };

  // обертка окна редатирования

  var REDACTOR_WRAPPER = document.querySelector('.img-upload__overlay');

  var Nodes = {
    EFFECT_CONTROL_WRAPPER: REDACTOR_WRAPPER.querySelector('.effect-level'),
    PHOTO_LOCATION: REDACTOR_WRAPPER.querySelector('.img-upload__preview img'),
    EFFECTS_LIST: REDACTOR_WRAPPER.querySelector('.effects__list'),
    SCALE_CONTROL_WRAPPER: REDACTOR_WRAPPER.querySelector('.img-upload__scale'),
  }

  // содержит данные необходимые для контроля за масштабом редактируемой фотографии

  var scaleСontrollerData = {
    max: '100%',
    min: '25%',
    condition: 'disabled',
    attribute: 'disabled',
    SIZE_INTERFACE: Nodes.SCALE_CONTROL_WRAPPER.children[1],
    LEFT_SIZE_CONTROLLER: Nodes.SCALE_CONTROL_WRAPPER.children[0],
    RIGHT_SIZE_CONTROLLER: Nodes.SCALE_CONTROL_WRAPPER.children[2],
  };

  // необходимо для отображения корректного значения в %, в поле изменения редактируемой фотографии -->
  // --> в случае если равно ***%(а именно 100%) то есть все остальные значения выглядят так **% -->
  // --> по тз лимит от 25%-100%

  var controlValueLength = function () {
    return scaleСontrollerData.SIZE_INTERFACE.value.length === 3
      ? Number(scaleСontrollerData.SIZE_INTERFACE.value.slice(0, 2)) - 25 + '%'
      : Number(scaleСontrollerData.SIZE_INTERFACE.value.slice(0, 3)) - 25 + '%';
  };


  // устанавливает макс/мин значения масштабирования --->
  // ---> редактируемой фотографии(значение отображается в % в интерфейсе поля-редактирования фотографии)

  var checkLimitValue = function (arg) {
    if (arg.SIZE_INTERFACE.value === arg.max) {
      arg.RIGHT_SIZE_CONTROLLER.setAttribute(arg.attribute, arg.condition);
    } else if (arg.SIZE_INTERFACE.value === arg.min) {
      arg.LEFT_SIZE_CONTROLLER.setAttribute(arg.attribute, arg.condition);
    }
  };

  // отображает масштаб фотографии в поле редактирования фото,
  // в зависимости от того на какой кнопке событие

  var setScaleValue = function (evt) {
    switch (evt.target) {
      case scaleСontrollerData.LEFT_SIZE_CONTROLLER:
        scaleСontrollerData.SIZE_INTERFACE.value = controlValueLength();
        scaleСontrollerData.RIGHT_SIZE_CONTROLLER.removeAttribute('disabled');
        break;
      case scaleСontrollerData.RIGHT_SIZE_CONTROLLER:
        scaleСontrollerData.SIZE_INTERFACE.value = Number(scaleСontrollerData.SIZE_INTERFACE.value.slice(0, 2)) + 25 + '%';
        scaleСontrollerData.LEFT_SIZE_CONTROLLER.removeAttribute('disabled');
        break;
    }
  };

  // вызывает 2 вышеупомянутые функции, а именно устанавливает границы масштаба 25%-100%,
  // шаг измененения масштаба равен 25% на каждый клик по котроллерам,
  // трансформирует фотографию, в зависимости от значения поля, содержащего текущий масштаб,
  // на основе структуры данных StyleSize{}

  var scaleButtonClickHandler = function (evt) {
    setScaleValue(evt);
    checkLimitValue(scaleСontrollerData);
    Nodes.PHOTO_LOCATION.style.transform = StyleSize[scaleСontrollerData.SIZE_INTERFACE.value];
  };

  var result;

  // убирает не актуальный эффект(css класс) у фотографии

  var removeUnnecessaryClass = function (evt) {
    for (var style in StyleEffect) {
      if (StyleEffect[evt.target.value.toUpperCase()] !== StyleEffect[style]) {
        result = StyleEffect[style];
        if (Nodes.PHOTO_LOCATION.classList.contains(result)) {
          Nodes.PHOTO_LOCATION.classList.remove(result);
        }
      }
    }
  };

  var effectsListClickHandler = function (evt) {
    Nodes.PHOTO_LOCATION.removeAttribute('style');
    // накладывает эффект на фотографию
    Nodes.PHOTO_LOCATION.classList.add(StyleEffect[evt.target.value.toUpperCase()]);
    removeUnnecessaryClass(evt);
    // скрывает контроллер глубины эффекта, в случае если эфект не выбран
    window.util.hideControlBlock(Nodes.PHOTO_LOCATION, Nodes.EFFECT_CONTROL_WRAPPER);
    // ставит пин-конртоллер в крайнее левое положение
    window.controller.EFFECT_CONTROLLER.style = 'left: 100%';
  };

  checkLimitValue(scaleСontrollerData);

  window.redactor = {
    Nodes: Nodes,
    scaleButtonClickHandler: scaleButtonClickHandler,
    effectsListClickHandler: effectsListClickHandler,
    StyleEffect: StyleEffect
  };

}());
