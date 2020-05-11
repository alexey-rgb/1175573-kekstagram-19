'use strict';

(function () {

  // количество мок-данных

  var COUNT_MOCK = 25;

  // ограничения на количество лайков и комментариев

  var Numbers = {
    MIN_COMMENT: 1,
    MAX_COMMENT: 6,
    MIN_LIKES: 15,
    MAX_LIKES: 200,
  };

  // тестовые комментарии

  var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  // тестовые имена комментаторов

  var USERS_NAMES = ['Артем', 'Оксана', 'Геннадий', 'Полина', 'Дрон', 'Никифор'];

  // данные-моки(возвращает фотографию с описанием, комментариями и их количеством)

  var mockData = function (number) {
    var photoDescriptions = [];
    var i = 1;
    for (; i <= number; i++) {
      photoDescriptions.push({
        url: 'photos/' + i + '.jpg',
        description: 'Описание фотографии',
        likes: window.util.getNumber(Numbers.MIN_LIKES, Numbers.MAX_LIKES),
        comments: window.util.getComments().length,
      });
    }
    return photoDescriptions;
  };

  // поля используются как флаги для отображения/сокрытия дом-элемента

  var Visability = {
    ON: 'show',
    OFF: 'hide'
  }

  /*********************************************** */

  // конструктор + функция для создания
  // дом-элемента и контроля за его видимостью(комментарии/блок загрузки следующих комментариев)

  var elementVisibilityData = function (node, hidden) {
    this.hidden = hidden;
    this.node = node;
  }

  elementVisibilityData.prototype.addRemoveClass = function (flag) {
    if (flag === Visability.ON) {
      return this.node.classList.add(this.hidden);
    } else if (flag === Visability.OFF) {
      return this.node.classList.remove(this.hidden);
    }
  };

  /*************************************************** */

  window.data = {
    Numbers: Numbers,
    MESSAGES: MESSAGES,
    USERS_NAMES: USERS_NAMES,
    COUNT_MOCK: COUNT_MOCK,
    mockData: mockData,
    elementVisibilityData: elementVisibilityData,
    Visability: Visability
  };
}());
