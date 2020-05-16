'use strict';

(function () {
  const Status = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    FORBIDDEN: 403
  };

  const Url = {
    POST: 'https://javascript.pages.academy/kekstagram',
    GET: 'https://javascript.pages.academy/kekstagram/data'
  }

  function setRequest(xhr, handleEvent, sendingError) {
  //  xhr.responseType = 'json';

    xhr.onload = function () {
      return xhr.status === Status.SUCCESS ? handleEvent(JSON.parse(xhr.response))
       : sendingError();
    };

    xhr.onerror = function () {
      `Ошибка ${xhr.status}: ${xhr.statusText}`;
    };
    /*   xhr.onprogress = function () {
        alert(`Получено ${event.loaded} из ${event.total} байт`);
      }; */
  }

  function getRequest(onLoad, url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    setRequest(xhr, onLoad, null);
    xhr.send();
  }

  function sendData(data, onSuccess, onError, url) {
    let xhr = new XMLHttpRequest();
    setRequest(xhr, onSuccess, onError);
    xhr.open('POST', url);
    xhr.send(data);
  }

  window.backend = {
    getRequest: getRequest,
    Url: Url,
    sendData: sendData
  }

}());
