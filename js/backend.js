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

  function setRequest(xhr, onLoad) {
    xhr.responseType = 'json';

    xhr.onload = function () {
      console.log(xhr.response);
      return xhr.status === Status.SUCCESS
        ? onLoad(xhr.response) : console.log('Error');
    };
    xhr.onerror = function () {
      `Ошибка ${xhr.status}: ${xhr.statusText}`;
    };
  /*   xhr.onprogress = function () {
      alert(`Получено ${event.loaded} из ${event.total} байт`);
    }; */
  }

  function getRequest(onLoad) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', Url.GET);
    setRequest(xhr, onLoad);
    xhr.send();
  }

  /*function sendData() {
    let xhr = new XMLHttpRequest();
    setRequest(xhr);
    xhr.open('POST', Url.POST);
    xhr.send(data);
  } */

  window.backend = {
    getRequest: getRequest
  }

}());
