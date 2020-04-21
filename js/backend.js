'use strict';

const status = {
  SUCCESS: 200,
  NOT_FOUND: 404,
  FORBIDDEN: 403
};

const Url = {
  POST: 'https://javascript.pages.academy/kekstagram',
  GET: 'https://javascript.pages.academy/kekstagram/data'
}

function setRequest(xhr) {
  xhr.responseType = 'json';

  xhr.onload = function () {
    return xhr.status === 200 ? console.log(xhr.response) : alert('Error');
  };
  /* xhr.onerror = function () {
    `Ошибка ${xhr.status}: ${xhr.statusText}`;
  };
  xhr.onprogress = function () {
    alert(`Получено ${event.loaded} из ${event.total} байт`);
  }; */
}

function getRequest() {

  let xhr = new XMLHttpRequest();

  xhr.open('GET', Url.GET);
  setRequest(xhr);
  xhr.send();
}

getRequest();

function sendData() {
  let xhr = new XMLHttpRequest();
  setRequest(xhr);
  xhr.open('POST', Url.POST);
  xhr.send(data);
}
