'use strict';

(function () {

  var Nodes = {
    REDACTOR_WRAPPER: document.querySelector('.img-upload__overlay'),
    DESC_WRAPPER: window.photo.Nodes.BIG_PICTURE_BLOCK,
    CLOSE_IMAGE_DESC: document.querySelector('.big-picture__cancel'),
    CLOSE_IMAGE_REDACTOR: document.querySelector('.img-upload__cancel'),
    FILE_LOADER: document.querySelector('#upload-file'),
  };

  // скрывает окно просмотра фотографии других пользователей и окно редатирования фотографии пользователя

  var hideBlock = (node) => node.REDACTOR_WRAPPER.classList.add('hidden')
    || node.DESC_WRAPPER.classList.add('hidden');

  // при нажатии на Esc закрывает модальные окна(описание фотографии/редактирование фото)

  function keyCloseDescription(evt) {
    if (evt.key === 'Escape') {
      window.loader.resetFileLoader();
      hideBlock(Nodes);
      window.util.hideControlBlock(window.loader.PHOTO_LOCATION,
        window.controller.EFFECT_CONTROL_WRAPPER, evt);
    }
  }

  // при клике по крестику закрывает модальные окна(описание фотографии или редактирование фото)

  function mouseCloseDescription() {
    window.loader.resetFileLoader();
    hideBlock(Nodes);
    window.util.hideControlBlock(window.loader.PHOTO_LOCATION,
      window.controller.EFFECT_CONTROL_WRAPPER);
  }

  // генерирует колбеки/обработчики

  var HandlerGenerator = {
    HANDLER_DATA: ['click', 'keydown', 'change', 'load', 'mousedown', 'mouseup'],
    constructor: function (element, idx, globalElement, idx2) {
      this.element = element;
      this.evt = this.HANDLER_DATA[idx];
      this.globalElement = globalElement;
      this.evt2 = this.HANDLER_DATA[idx2];
      return this;
    },
    buttonClickHandler: mouseCloseDescription,
    escHandler: keyCloseDescription,
    addHandler: function () {
      this.element.addEventListener(this.evt, this.buttonClickHandler);
      this.globalElement.addEventListener(this.evt2, this.escHandler);
    },
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
  };

}());
