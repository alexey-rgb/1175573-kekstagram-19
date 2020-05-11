'use strict';

(function () {
  var LOADER = document.querySelector('#upload-file');

  var PHOTO_LOCATION = document.querySelector('.img-upload__preview img');

  var classHidden = 'hidden';

  // после закрытия окна с возможностью редактирования фотографии
  // обнуляем значение поля загрузки фотографии, что бы была возможность
  // грузить одну и туже фотографию несколько раз и удаляем эффект с фотографии
  // в случае если пользователь установил эффект, не отправил фото и просто закрыл окно редактирования

  var resetFileLoader = function () {
    if (window.copy.Nodes.DESC_WRAPPER.classList.contains(classHidden)) {
      window.copy.Nodes.FILE_LOADER.value = '';
      PHOTO_LOCATION.setAttribute('class', '');
      PHOTO_LOCATION.classList.add(window.redactor.StyleEffect.NONE);
      PHOTO_LOCATION.removeAttribute('style');
    }
  };

  // объект для управления видимостью окна редактирования фотографии

  var redactorWrapper = new window.data.elementVisibilityData(window.copy.Nodes.REDACTOR_WRAPPER,
    classHidden);

  // типы возможных к загрузке изображений

  var IMAGE_TYPE = ['jpg', 'jpeg', 'png', 'gif', 'heic', 'webp'];

  // процедура загрузки фотографии для редактирования с использованием файл-ридера.

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
    redactorWrapper.addRemoveClass(window.data.Visability.OFF);
  });

  window.loader = {
    PHOTO_LOCATION: PHOTO_LOCATION,
    resetFileLoader: resetFileLoader
  };

}());
