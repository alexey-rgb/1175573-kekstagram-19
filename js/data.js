'use strict';

(function () {

  var COUNT_MOCK = 25;

  var COUNT_FOR_COMMENTS = 6;

  var Numbers = {
    MIN_COMMENT: 1,
    MIN_LIKES: 15,
    MAX_LIKES: 200,
  };

  var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var USERS_NAMES = ['Артем', 'Оксана', 'Геннадий', 'Полина', 'Дрон', 'Никифор'];

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

  window.data = {
    Numbers: Numbers,
    MESSAGES: MESSAGES,
    USERS_NAMES: USERS_NAMES,
    COUNT_FOR_COMMENTS: COUNT_FOR_COMMENTS,
    COUNT_MOCK: COUNT_MOCK,
    mockData: mockData,
  };
}());
