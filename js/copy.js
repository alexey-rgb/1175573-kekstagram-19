'use strict';

(function () {

  var Nodes = {
    REDACTOR_WRAPPER: document.querySelector('.img-upload__overlay'),
    DESC_WRAPPER: window.photo.Nodes.BIG_PICTURE_BLOCK,
    CLOSE_IMAGE_DESC: document.querySelector('.big-picture__cancel'),
    CLOSE_IMAGE_REDACTOR: document.querySelector('.img-upload__cancel'),
    FILE_LOADER: document.querySelector('#upload-file'),
  };

  var EFFECT_LEVEL_DEPTH = Nodes.REDACTOR_WRAPPER.querySelector('.effect-level__depth');

  // скрывает окно просмотра фотографии других пользователей и окно редатирования фотографии пользователя

  function hideBlock(node) {
    Nodes.REDACTOR_WRAPPER.classList.add('hidden')
      || node.DESC_WRAPPER.classList.add('hidden');
  }

  function backPageToStartSettings (event) {
     window.loader.resetFileLoader();
      hideBlock(Nodes);
      window.util.hideControlBlock(window.loader.PHOTO_LOCATION,
        window.controller.EFFECT_CONTROL_WRAPPER, event);
      window.redactor.backToStartSetScaleContoller(window.redactor.scaleСontrollerData)
      /*****************оконстантить isRemoove********************* */
      window.form.redactorPopupHandlerCondition('isRemoove', window.form.HASHTAG_FIELD, window.form.TEXT_AREA)
      EFFECT_LEVEL_DEPTH.style = 'width: 100%;';
  }

  // при нажатии на Esc закрывает модальные окна(описание фотографии/редактирование фото)

  function keyCloseDescription(evt) {
    if (evt.key === 'Escape') {
      backPageToStartSettings(evt);
    }
  }

  // при клике по крестику закрывает модальные окна(описание фотографии или редактирование фото)

  function mouseCloseDescription() {
    backPageToStartSettings();
  }

  // генерирует колбеки/обработчики

  var HandlerGenerator = {
    HANDLER_DATA: ['click', 'keydown', 'change', 'load', 'mousedown', 'mouseup'],
    HANDLER_STATUSES: ['isAdd', 'isRemoove'],
    constructor: function (element, idx, globalElement, idx2) {
      this.element = element;
      this.evt = this.HANDLER_DATA[idx];
      this.globalElement = globalElement;
      this.evt2 = this.HANDLER_DATA[idx2];
      return this;
    },
    buttonClickHandler: mouseCloseDescription,
    escHandler: keyCloseDescription,
    addHandler: function (flag) {
      if (flag === this.HANDLER_STATUSES[0]) {
        this.globalElement.addEventListener(this.evt2, this.escHandler);
        this.element.addEventListener(this.evt, this.buttonClickHandler);
      }
      else if (flag === this.HANDLER_STATUSES[1]) {
        this.globalElement.removeEventListener(this.evt2, this.escHandler);
      }
    }
  };

  // объект класса HandlerGenerator для управления окном описания фотографии

  var photoDesc = Object.create(HandlerGenerator).constructor(Nodes.CLOSE_IMAGE_DESC,
    0, document, 1);

  // объект класса HandlerGenerator для управления окном редактирования фотографии

  var photoRedactor = Object.create(HandlerGenerator).constructor(Nodes.CLOSE_IMAGE_REDACTOR,
    0, document, 1);

  window.copy = {
    photoDesc: photoDesc,
    photoRedactor: photoRedactor,
    Nodes: Nodes,
    backPageToStartSettings: backPageToStartSettings
  };

}());
