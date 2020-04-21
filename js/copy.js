'use strict';

(function () {

  var Nodes = {
    REDACTOR_WRAPPER: document.querySelector('.img-upload__overlay'),
    DESC_WRAPPER: window.photo.Nodes.BIG_PICTURE_BLOCK,
    CLOSE_IMAGE_DESC: document.querySelector('.big-picture__cancel'),
    CLOSE_IMAGE_REDACTOR: document.querySelector('.img-upload__cancel'),
    FILE_LOADER: document.querySelector('#upload-file'),
  };

  // генерирует колбеки/обработчики

  var HandlerGenerator = {
    HANDLER_DATA: ['click', 'keydown', 'change', 'load', 'mousedown', 'mouseup'],
    constructor: function (element, idx, handler, globalElement, idx2) {
      this.element = element;
      this.evt = this.HANDLER_DATA[idx];
      this.handler = handler;
      this.globalElement = globalElement;
      this.evt2 = this.HANDLER_DATA[idx2];
      return this;
    },
    addHandler: function () {
      this.element.addEventListener(this.evt, this.handler);
      //this.globalElement.addEventListener(this.evt2, this.handler);
    },
  };

  // при клике по крестику закрывает модальные окна(описание фотографии или редактирование фото)

  function mouseCloseDescription() {
    window.photo.notDuplicateStrings.splice(0, window.photo.notDuplicateStrings.length);
    window.loader.resetFileLoader();
    this.REDACTOR_WRAPPER.classList.add('hidden') || this.DESC_WRAPPER.classList.add('hidden');
    window.controller.EFFECT_CONTROL_WRAPPER.setAttribute('hidden', 'hidden');
    // window.controller.hideControlBlock(window.loader.PHOTO_LOCATION, window.controller.EFFECT_CONTROL_WRAPPER);
  }

  // при нажатии на Esc закрывает модальные окна(описание фотографии/редактирование фото)

  function keyCloseDescription(evt) {
    if (evt.key === 'Escape') {
      window.photo.notDuplicateStrings.splice(0, window.photo.notDuplicateStrings.length);
      this.REDACTOR_WRAPPER.classList.add('hidden') || this.DESC_WRAPPER.classList.add('hidden');
    }
  }

  // объединяет разные возможности закрытия модальных окон (мышкой и с клавиатуры)

  var buttonClickKeydownHandler = function (evt) {
    mouseCloseDescription.apply(Nodes);
    keyCloseDescription.apply(Nodes, [evt]);
  };

  // объект класса HandlerGenerator для управления окном описания фотографии

  var photoDesc = Object.create(HandlerGenerator).constructor(Nodes.CLOSE_IMAGE_DESC,
    0, buttonClickKeydownHandler, document, 1);

  // объект класса HandlerGenerator для управления окном редактирования фотографии

  var photoRedactor = Object.create(HandlerGenerator).constructor(Nodes.CLOSE_IMAGE_REDACTOR,
    0, buttonClickKeydownHandler, document, 1);

  window.copy = {
    photoDesc: photoDesc,
    photoRedactor: photoRedactor,
    Nodes: Nodes,
  };

}());
