import { openPopup } from "./modal";
import { fillCardData } from "./modal";

export const cardContainer = document.querySelector('.places__list');
export const popupCard = document.querySelector('.popup_type_image');

export function createCard(item, deleteCard, openPopup, likeCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = item.link;
  cardImage.alt = `Изображение локации ${item.name}`;
  cardTitle.textContent = item.name;
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  function handleImageClick() {
    openPopup(popupCard);
    fillCardData(cardImage, cardTitle);
  }

  cardImage.addEventListener('click', handleImageClick);
  likeButton.addEventListener('click', () => likeCard(likeButton));
  return cardElement;
}

export function deleteCard(card) {
  card.remove();
}

export function likeCard(card) {
  card.classList.toggle('card__like-button_is-active');
}

export function addCards(initCardsArray, deleteCard, likeCard) {
  initCardsArray.forEach((item) => {
    const cardElement = createCard(item, deleteCard, openPopup, likeCard);
    cardContainer.append(cardElement);
  });
}