import { saveNewCard, userId, deleteCardRequest } from "./api";
import { closePopup, openPopup } from "./modal";
import { fillCardData } from "./modal";

export const cardContainer = document.querySelector('.places__list');
export const popupCard = document.querySelector('.popup_type_image');

const popupConfirm = document.querySelector('.popup_type_confirm');
const confirmButton = popupConfirm.querySelector('.popup__button')

export function createCard(cardObject, deleteCard, openPopup, likeCard) {
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
  if (cardObject.likes.length > 0) {
    likeCounter.textContent = cardObject.likes.length;
  };

  if (userId === cardObject.owner._id) {
    deleteButton.classList.remove('card__delete-button_inactive');
    deleteButton.disabled = false;
    deleteButton.addEventListener('click', () => deleteCard(cardObject, cardElement));
  }
  else {
    deleteButton.classList.add('card__delete-button_inactive');
    deleteButton.disabled = true;
  }

  function handleImageClick() {
    openPopup(popupCard);
    fillCardData(cardImage, cardTitle);
  }

  cardImage.addEventListener('click', handleImageClick);
  likeButton.addEventListener('click', () => likeCard(likeButton));

  return cardElement;
}

export function deleteCard(cardObject, cardElement) {
  openPopup(popupConfirm);

  function confirmDelete() {
    deleteCardRequest(cardObject)
    .then(() => {
      cardElement.remove();
      closePopup(popupConfirm);
      confirmButton.removeEventListener('click', confirmDelete);
    })
  }

  confirmButton.addEventListener('click', confirmDelete);
}

export function likeCard(card) {
  card.classList.toggle('card__like-button_is-active');
}