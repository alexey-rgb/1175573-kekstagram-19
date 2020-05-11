'use strict';

(function () {

  var Nodes = {
    PICTURE_TEMPLATE: document.querySelector('#picture').content,
    PICTURES_WRAPPER: document.querySelector('.pictures'),
    BIG_PICTURE_BLOCK: document.querySelector('.big-picture'),
    BIG_PICTURE_WRAPPER: document.querySelector('.big-picture__img'),
    LIKES_COUNT: document.querySelector('.likes-count'),
    COMMENTS_COUNT: document.querySelector('.comments-count'),
    SOCIAL_COMMENTS: document.querySelector('.social__comments'),
    SOCIAL_TEXT: document.querySelectorAll('.social__text'),
    IMAGE_DESCRIPTION: document.querySelector('.social__caption'),
    BODY: document.querySelector('body'),
    COMMENT_COUNT: document.querySelector('.social__comment-count'),
    COMMENT_LOADER: document.querySelector('.comments-loader'),
  };

  var SOCIAL_PICTURE = Nodes.SOCIAL_COMMENTS.querySelector('.social__picture');

  var classHidden = 'hidden';


  var renderMessage = function (comments, node) {
    comments.forEach(function (comment, j) {
      node[j].textContent = comment.message;
    });
  };

  // рендерит лайки, описание, количество коментариев, сами комментарии, увеличенное фото пользователя

  let changeCountOfRenderComment = (node, data) => data == 1
    ? node.textContent = 'тут пока 1 комментарий' : node.textContent = '2 из ' + data + ' комментариев';

  var renderPhotoDescription = function (item) {
    Nodes.BIG_PICTURE_BLOCK.classList.remove(classHidden);
    Nodes.BIG_PICTURE_WRAPPER.children[0].src = item.url;
    Nodes.LIKES_COUNT.textContent = item.likes;
    Nodes.COMMENTS_COUNT.textContent = item.comments.length;
    Nodes.IMAGE_DESCRIPTION.textContent = item.description;
    changeCountOfRenderComment(Nodes.COMMENT_COUNT, item.comments.length);
    renderMessage(item.comments, Nodes.SOCIAL_TEXT);
  };

  // объекты для управления видимостью дом-элементов(кол-во коммент/кнопка загрузки следующих комментариев)

  var commentCount = new window.data.elementVisibilityData(Nodes.COMMENT_COUNT, classHidden);
  var commentLoader = new window.data.elementVisibilityData(Nodes.COMMENT_LOADER, classHidden);

  // прячем по тз количество комментариев и кнопку загруки других комментариев

  var removeClasses = function () {
    commentCount.addRemoveClass(window.data.Visability.ON);
    commentCount.addRemoveClass.call(commentLoader, window.data.Visability.ON);
  };

  // рендерит случайное фото пользователя(при ховере видно количество коментариев, лайков).
  // можно кликнуть на фото и получаем развернутое описание фотографии
  //(большое фото, лайки, коментарии, их количества, описание, поле для комментария)

  var renderPhoto = function (item) {
    var pictureClickHandler = function () {
      removeClasses();
      renderPhotoDescription(item);
      Nodes.BODY.classList.add('modal-open');
    };
    var newPictureDesc = Nodes.PICTURE_TEMPLATE.cloneNode(true);
    newPictureDesc.querySelector('.picture__img').src = item.url;
    newPictureDesc.querySelector('.picture__comments').textContent = item.comments.length;
    newPictureDesc.querySelector('.picture__likes').textContent = item.likes;
    newPictureDesc.querySelector('.picture').addEventListener('click', pictureClickHandler);
    return newPictureDesc;
  };

  // записываем будущие ноды во фрагмент

  var renderPhotos = function (descriptions) {
    console.log(Array.isArray(descriptions))
    var fragment = document.createDocumentFragment();
    descriptions.forEach(function (item) {
      fragment.appendChild(renderPhoto(item));
    });
    return fragment;
  };

  var insertNewDomElement = (data) => Nodes.PICTURES_WRAPPER.appendChild(renderPhotos(data));

  window.photo = {
    Nodes: Nodes,
    classHidden: classHidden,
    insertNewDomElement: insertNewDomElement
  };
}());

/****************Все что касалось мок-данных*******************/

 // используем как кэш для получения уникальных комментариев(без дубля)

/*  var notDuplicateStrings = []; */

  // исключает дублирование строк в рандомных комментариях к фотографиям пользователей

/*  var compareMessage = function (item) {
   if (!notDuplicateStrings.includes(item.message)) {
     notDuplicateStrings.push(item.message);
   }
   SOCIAL_PICTURE.src = item.avatar;
   SOCIAL_PICTURE.alt = item.name;
 }; */

  // рендерит текст комментария

/*  var renderMessage = function () {
   notDuplicateStrings.forEach(function (message, j) {
     Nodes.SOCIAL_TEXT[j].textContent = message;
   });
 }; */

   // рендерит все что связано с комментарием(текст, аватарка, имя комментатора)

/*   function renderComment() {
    window.util.getComments().forEach(function (commentDesc, i) {
      compareMessage(commentDesc, i);
    });
    renderMessage();
  } */


