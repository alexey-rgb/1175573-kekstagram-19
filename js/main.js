'use strict';

(function () {

  var handlerStatuses = ['isAdd', 'isRemoove'];

  // рендерит json-ответ сервера в виде 25 фотографий пользователей с описанием

  window.backend.getRequest(window.photo.insertNewDomElement, window.backend.Url.GET);

  // активирует возможность открытия/закрытия фотографий и описания, других пользователей

  window.copy.photoDesc.addHandler(handlerStatuses[0]);

  // отображает масштаб редактируемого фото в %

  window.redactor.Nodes.SCALE_CONTROL_WRAPPER.addEventListener('click', window.redactor.scaleButtonClickHandler);

  // накладывает эффект на фотографию

  window.redactor.Nodes.EFFECTS_LIST.addEventListener('click', window.redactor.effectsListClickHandler);

}());
