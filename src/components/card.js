import {
  deleteCardRequest,
  addLikeCardRequest,
  removeLikeCardRequest,
} from './api';
import { closePopup, openPopup } from './modal';
import { fillCardData } from './modal';

export const cardContainer = document.querySelector('.places__list');
export const popupCard = document.querySelector('.popup_type_image');

const popupConfirm = document.querySelector('.popup_type_confirm');
const confirmButton = popupConfirm.querySelector('.popup__button');

export function createCard(
  cardObject,
  userId,
  deleteCard,
  handleImageClick,
  likeCard
) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardImage.src = cardObject.link;
  cardImage.alt = `Изображение локации ${cardObject.name}`;
  cardTitle.textContent = cardObject.name;
  deleteButton.classList.add('card__delete-button_inactive');
  deleteButton.disabled = true;

  showLikes(cardObject, likeCounter);

  if (userId === cardObject.owner._id) {
    deleteButton.classList.remove('card__delete-button_inactive');
    deleteButton.disabled = false;
    deleteButton.addEventListener('click', () =>
      deleteCard(cardObject, cardElement)
    );
  }
  
  cardImage.addEventListener('click', () => handleImageClick(cardImage, cardTitle));
  likeButton.addEventListener('click', () =>
    likeCard(cardObject, likeButton, likeCounter)
  );

  showUserLikes(cardObject, userId, likeButton);
  return cardElement;
}

export function handleImageClick(cardImage, cardTitle) {
  openPopup(popupCard);
  fillCardData(cardImage, cardTitle);
};

export function deleteCard(cardObject, cardElement) {
  openPopup(popupConfirm);

  function confirmDelete() {
    deleteCardRequest(cardObject)
      .then(() => {
        cardElement.remove();
        closePopup(popupConfirm);
        confirmButton.removeEventListener('click', confirmDelete);
      })
      .catch((err) => console.log(err));
  }

  confirmButton.addEventListener('click', confirmDelete);
}

export function likeCard(cardObject, likeButton, likeCounter) {
  if (!likeButton.classList.contains('card__like-button_is-active')) {
    addLikeCardRequest(cardObject)
      .then((res) => {
        likeButton.classList.add('card__like-button_is-active');
        likeCounter.textContent = res.likes.length;
        showLikes(res, likeCounter);
      })
      .catch((err) => console.log(err));
  } else {
    removeLikeCardRequest(cardObject)
      .then((res) => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCounter.textContent = res.likes.length;
        showLikes(res, likeCounter);
      })
      .catch((err) => console.log(err));
  }
}

function showLikes(cardObject, likeCounter) {
  if (cardObject.likes.length > 0) {
    return (likeCounter.textContent = cardObject.likes.length);
  } else {
    return (likeCounter.textContent = '');
  }
}

function showUserLikes(cardObject, userId, likeButton) {
  const hasUserLike = cardObject.likes.some((like) => like._id === userId);
  if (hasUserLike) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }
}
