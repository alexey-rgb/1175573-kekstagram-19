'use strict';

var HASHTAG_FIELD = window.controller.FORM.querySelector('.text__hashtags');
var COMENTS_FIELD = window.controller.FORM.querySelector('.text__description');
var hashTags;
var has

HASHTAG_FIELD.addEventListener('blur', function () {
  hashTags = HASHTAG_FIELD.value.split('#');
  /* console.log(typeof hashTags[1].charAt(hashTags[1].length - 1)); */
   hashTags.forEach(function(hashTag) {
console.log(hashTag.length);
console.log(hashTag.charAt(hashTag.length - 1));
  if (hashTag.includes(' ') === true) {
/*  alert('Пробел в хэштэге'); */
    HASHTAG_FIELD.setCustomValidity('Пробел в хэштэге');

   } else  {
     HASHTAG_FIELD.setCustomValidity('');
   }
 });
});

