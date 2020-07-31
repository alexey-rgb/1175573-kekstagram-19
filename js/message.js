'use strict';

(function () {

  // шаблоны сообщений о статусе отправки формы

  var Templates = {
    SUCCESS_MESSAGE: document.querySelector('#success').content,
    ERROR_MESSAGE: document.querySelector('#error').content
  }

  // кнопка-фильтр(ПО УМОЛЧАНИЮ)

  var FILTER_DEFAULT = document.querySelector('#filter-default');

  // css класс активной кнопки(фильтр)

  var activeButton = 'img-filters__button--active';

  // коллекция кнопок(фильтры)

  var FILTERS_BUTTON = document.body.querySelectorAll('.img-filters__form button');

  // массив хранит классы кнопок закрытия модальных окон(окна содержат статус отправки формы)

  var closeButtons = ['.success__button', '.error__button'];

  // после отправки формы возвращает активный класс кнопке-фильтр(ПО УМОЛЧАНИЮ)

  function switchActiveClass(nodes) {
    Array.from(nodes).forEach(element => {
      element.classList.remove(activeButton);
    });
    FILTERS_BUTTON[0].classList.add(activeButton);
  }

  // откатывают блок с фильтрами к исходному состоянию и рендерит 25 не отфильтрованных фотографий

  function backFilterToStartSettings(buttonClass) {
    var MESSAGE_WRAPPER = document.body.lastElementChild;
    var BUTTON = MESSAGE_WRAPPER.querySelector(buttonClass);
    var successButtonClickHandler = function () {
      if (!FILTER_DEFAULT.classList.contains(activeButton)) {
        var PICTURE_LINK = document.querySelectorAll('.picture');
        // удаляет все фотографии
        PICTURE_LINK.forEach(photo => photo.remove());
        // рендерит новые/по-умолчанию
        window.backend.getRequest(window.photo.insertNewDomElement, window.backend.Url.GET);
        switchActiveClass(FILTERS_BUTTON)
      }
      MESSAGE_WRAPPER.remove();
    };
    BUTTON.onclick = successButtonClickHandler;
  }

  // рендерит сообщение с успешным статусом отправки

  function renderSuccessMessage() {
    var message = Templates.SUCCESS_MESSAGE.cloneNode(true);
    // рендерит сообщение
    document.body.appendChild(message);
    // 2 ф-ции откатывают dom к исходному состоянию и структуре
    window.copy.backPageToStartSettings();
    backFilterToStartSettings(closeButtons[0]);
    return;
  }

  // рендерит сообщение с не успешным статусом отправки

  function renderErrorMessage() {
    var message = Templates.ERROR_MESSAGE.cloneNode(true);
    // рендерит сообщение
    document.body.appendChild(message);
    // 2 ф-ции откатывают dom к исходному состоянию и структуре
    window.copy.backPageToStartSettings();
    backFilterToStartSettings(closeButtons[1]);
    return;
  }

  window.message = {
    renderSuccessMessage: renderSuccessMessage,
    renderErrorMessage: renderErrorMessage
  }
}())
