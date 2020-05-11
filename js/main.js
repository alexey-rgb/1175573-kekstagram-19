'use strict';

(function () {

  // присваиваем моки переменной

  /*  var ads = window.data.mockData(window.data.COUNT_MOCK); */

  // рендерит json-ответ сервера в виде 25 фотографий пользователей с описанием

  window.backend.getRequest(window.photo.insertNewDomElement);

  // активирует возможность открытия/закрытия фотографий и описания, других пользователей

  window.copy.photoDesc.addHandler();

  // активирует возможность открытия/закрытия окна редатирования фото разными способами

  window.copy.photoRedactor.addHandler();

  // отображает масштаб редактируемого фото в %

  window.redactor.Nodes.SCALE_CONTROL_WRAPPER.addEventListener('click', window.redactor.scaleButtonClickHandler);

  // накладывает эффект на фотографию

  window.redactor.Nodes.EFFECTS_LIST.addEventListener('click', window.redactor.effectsListClickHandler);

}());
