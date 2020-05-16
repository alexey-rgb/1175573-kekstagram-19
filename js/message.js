'use strict';

(function () {

  var SUCCESS_TEMPLATE_MESSAGE = document.querySelector('#success').content;

  var SUCCESS_MESSAGE_WRAPPER = SUCCESS_TEMPLATE_MESSAGE.querySelector('.success');

  var SUCCESS_BUTTON = SUCCESS_TEMPLATE_MESSAGE.querySelector('.success__button');

  var ERROR_MESSAGE = document.querySelector('#error').content;

  function messageButtonClickHandler() {
    SUCCESS_MESSAGE_WRAPPER.remove();
    //return;
  }

/*   function addRemoveHandlerOnMessage(node, flag, handler) {
     return flag == true ? node.addEventListener('click', handler) : node.removeEventListener('click', handler);
  } */

  function renderSuccessMessage() {
    var message = SUCCESS_TEMPLATE_MESSAGE.cloneNode(true);
   // var successMessageButtonClickHandler = () => messageButtonClickHandler(SUCCESS_MESSAGE_WRAPPER)
    document.body.appendChild(message);
    window.copy.backPageToStartSettings();
   // addRemoveHandlerOnMessage(SUCCESS_BUTTON, true, messageButtonClickHandler);
  }

  function renderErrorMessage() {
    var message = ERROR_MESSAGE.cloneNode(true);
    document.body.appendChild(message);
    window.copy.backPageToStartSettings()
    return;
  }

  window.message = {
    renderSuccessMessage: renderSuccessMessage,
    renderErrorMessage: renderErrorMessage
  }
}())
