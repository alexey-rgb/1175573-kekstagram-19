'use strict';

(function () {

  // моки

  var ads = window.data.mockData(window.data.COUNT_MOCK);

  // рендерит 25 фотографий пользователей

  window.photo.Nodes.PICTURES_WRAPPER.appendChild(window.photo.render(ads));

  // активирует возможность открытия/закрытия фотографий и описания, других пользователей

  window.copy.photoDesc.addHandler();

  // активирует возможность открытия/закрытия окна редатирования фото разными способами

  window.copy.photoRedactor.addHandler();

  // отображает масштаб редактируемого фото в %

  window.redactor.SCALE_CONTROL_WRAPPER.addEventListener('click', window.redactor.scaleButtonClickHandler);

  // накладывает эффект на фотографию

  window.redactor.EFFECTS_LIST.addEventListener('click', window.redactor.effectsListClickHandler);

}());
