'use strict';

(function () {
  var FORM = document.querySelector('.img-upload__form');

  var HASHTAG_FIELD = window.controller.FORM.querySelector('.text__hashtags');

  var TEXT_AREA = window.controller.FORM.querySelector('.text__description');

  var handlerStatuses = ['isAdd', 'isRemoove'];

  var reg = new RegExp(/\w#/g);

  // проверка введенных пользователем хэштегов на валидность

  function checkHashtag(node) {

    var hashtagValue = node.value;
    var delSymb = hashtagValue.replace(/[#' ']/g, '');
    var a = hashtagValue.replace(/ {1,}/g, " ").split(' ');

    for (var i = 0; i < a.length; i++) {
      if (reg.test(hashtagValue) === true)
        return node.setCustomValidity('there must been the spacetrailling between hashtags');
      else if (a[i].length > 20)
        return node.setCustomValidity('hashtag must be less then 20 symbols');
      else if (a[i][0] !== '#')
        return node.setCustomValidity('hashtag only can start with #');
      else if (a.length > 5)
        return node.setCustomValidity('you have 5 hashtags limit');
      else if (a[i].length === 1)
        return node.setCustomValidity('hashtag must contents with numbers or letters & start with #');
      else if (delSymb.search(/\W/) !== -1)
        return node.setCustomValidity('hashtag may consist only letters or numbers not symbol & start with #');
      node.setCustomValidity('');
    }
  }

  // если поле с хештегами окажется в фокусе, то закрытие модального окна(редактор фото) невозможно

  function hashtagFocusHandler() {
    window.copy.photoRedactor.addHandler(handlerStatuses[1]);
  }

  // если поле с хештегами теряет фокус, то закрытие модального окна(редактор фото) возможно
  // + вызывается функция проверки введенных хештегов на валидность

  function hashtagBlurHandler() {
    window.copy.photoRedactor.addHandler(handlerStatuses[0]);
    checkHashtag(HASHTAG_FIELD);
  }

  /****************Сократить кол-во аргументов****************** */

  // в зависимости от флага, добавляет или удаляет обработчик

  function redactorPopupHandlerCondition(flag, hashtag, textField) {
    if (flag === handlerStatuses[0]) {
      hashtag.addEventListener('focus', hashtagFocusHandler)
      hashtag.addEventListener('blur', hashtagBlurHandler)
      textField.addEventListener('focus', hashtagFocusHandler)
      textField.addEventListener('blur', hashtagBlurHandler)
    } else if (flag === handlerStatuses[1]) {
      hashtag.removeEventListener('focus', hashtagFocusHandler)
      hashtag.removeEventListener('blur', hashtagBlurHandler)
      textField.removeEventListener('focus', hashtagFocusHandler)
      textField.removeEventListener('blur', hashtagBlurHandler)
    }
  }

  // отправляет данные формы на сервер, восстанавливает стандартные значения всем элементам формы

  var formSubmitHandler = (evt) => {
    evt.preventDefault();
    /********************Сократить кол-во аргументов************************************ */
    window.backend.sendData(new FormData(FORM),
      window.message.renderSuccessMessage, window.message.renderErrorMessage, window.backend.Url.POST);
    FORM.reset();
  }

  FORM.addEventListener('submit', formSubmitHandler)

  window.form = {
    HASHTAG_FIELD: HASHTAG_FIELD,
    TEXT_AREA: TEXT_AREA,
    redactorPopupHandlerCondition: redactorPopupHandlerCondition
  }

}())
