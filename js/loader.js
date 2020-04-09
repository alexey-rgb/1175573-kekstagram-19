'use strict';

(function () {
  var LOADER = document.querySelector('#upload-file');

  var PHOTO_LOCATION = document.querySelector('.img-upload__preview img');

  var resetFileLoader = function () {
    if (window.copy.Nodes.DESC_WRAPPER.classList.contains('hidden')) {
      window.copy.Nodes.FILE_LOADER.value = '';
      PHOTO_LOCATION.setAttribute('class', '');
      PHOTO_LOCATION.classList.add(window.redactor.StyleEffect.NONE);
    }
  };

  var IMAGE_TYPE = ['jpeg', 'png', 'gif', 'heic', 'webp'];

  LOADER.addEventListener('change', function () {
    var file = LOADER.files[0];
    var fileName = file.name.toLowerCase();
    var rightFile = IMAGE_TYPE.some(type => fileName.endsWith(type));
    var reader = new FileReader();
    if (rightFile) {
      reader.addEventListener('load', function () {
        PHOTO_LOCATION.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
    window.util.addRemoveClass(window.copy.Nodes.REDACTOR_WRAPPER, 'hidden', 0);
  });

  window.loader = {
    PHOTO_LOCATION: PHOTO_LOCATION,
    resetFileLoader: resetFileLoader
  };

}());
