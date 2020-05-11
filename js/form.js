'use strict';

(function () {

  var HASHTAG_FIELD = window.controller.FORM.querySelector('.text__hashtags');

  HASHTAG_FIELD.addEventListener('blur', function () {
    var t = HASHTAG_FIELD.value;
    let delSymb = t.replace(/[#' ']/g, '');
    let reg = new RegExp(/\w#/g);
    var a = t.replace(/ {1,}/g," ").split(' ');

    for (var i = 0; i < a.length; i++) {
      if (reg.test(t) === true)
       return HASHTAG_FIELD.setCustomValidity('there must been the spacetrailling between hashtags');
      else if (a[i].length > 20)
       return HASHTAG_FIELD.setCustomValidity('hashtag must be less then 20 symbols');
      else if (a[i][0] !== '#')
       return HASHTAG_FIELD.setCustomValidity('hashtag only can start with #');
      else if (a.length > 5)
       return HASHTAG_FIELD.setCustomValidity('you have 5 hashtags limit');
      else if (a[i].length === 1)
       return HASHTAG_FIELD.setCustomValidity('hashtag must contents with numbers or letters & start with #');
      else if (delSymb.search(/\W/) !== -1)
        return HASHTAG_FIELD.setCustomValidity('хэштег может состоять только из букв и цифр и не должен содержать символов');
      HASHTAG_FIELD.setCustomValidity('');
    }
  });

}())
