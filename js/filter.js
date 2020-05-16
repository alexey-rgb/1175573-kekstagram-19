'use strict';

(function () {

  // родительский блок фильтров(кнопки)

  var PICTURES_WRAPPER = document.querySelector('.pictures');

  // id фильтров(кнопок) + класс активной кнопки(последний элемент)

  var filters = ['filter-default', 'filter-random', 'filter-discussed', "img-filters__button--active"];

  // возвращает 10 рандомных фото

  function getTenPhoto(data) {
    var number = window.util.getNumber(1, 15);
    return data.slice(number, number + 10);
  }

  // сортирует фотографии по-убыванию комментариев к ним

  function compareNumbers(a, b) {
    return b['comments'].length - a['comments'].length;
  }

  /*********************Сократить количество аргументов*********************** */

  // в зависимости от кнопки применяет функция-фильтр(вышеуказанные)

  function searchButton(but, data1, data2) {
    switch (but.getAttribute('id')) {
      case this.filters[0]:
        // просто рендерит все фотографии, как при первоночальной загрузке страницы
        PICTURES_WRAPPER.appendChild(window.photo.renderPhotos(data2));
        break;
      case this.filters[1]:
        PICTURES_WRAPPER.appendChild(window.photo.renderPhotos(this.getTenPhoto(data1)));
        break;
      case this.filters[2]:
        PICTURES_WRAPPER.appendChild(window.photo.renderPhotos(data1.sort(this.compareNumbers)));
        break;
    }
  }

  // эти аргументы передаются массивом в непрямой вызов функции
  // методом apply для переключения css стиля активной кнопки(фильтр)

  var applyArgforFilterControl = [true, [filters[3]]];

  // обработчик для кнопок(фильтр), применятся css стиль для активного фильтра
  // удаляются все фотографии
  // рендерятся новые фотографии, в зависимости от типа фильтра

   /*********************Сократить количество аргументов*********************** */

  function filterClickHandler(evt, data, data2) {
    var PICTURE_LINK = document.querySelectorAll('.picture');
    window.filter.Filter.FILTER_BUTTONS.forEach(b => {
      if (evt.target === b) {
        applyArgforFilterControl[1][1] = b;
        window.photo.commentCount.addRemoveClass.apply(b, applyArgforFilterControl);
        PICTURE_LINK.forEach(photo => photo.remove())
        window.filter.Filter.searchButton(b, data, data2)
      }
    })
  }

  // описывает все функции и ноды, связанные с фильтрацией

  let Filter = {
    FILTER_WRAPPER: document.body.querySelector('.img-filters'),
    FILTER_BUTTONS: document.querySelectorAll('button[type="button"]'),
    filters: ['filter-default', 'filter-random', 'filter-discussed'],
    getTenPhoto: getTenPhoto,
    filters: filters,
    compareNumbers: compareNumbers,
    searchButton: searchButton,
    filterClickHandler: filterClickHandler
  }

  window.filter = {
    Filter: Filter
  }
}())

