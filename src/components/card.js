import { openPopupCard } from "./modal";

export function createCard(item, deleteCard, openPopupCard, likeCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const popupCard = document.querySelector('.popup_type_image');
    
    cardImage.src = item.link;
    cardImage.alt = `Изображение локации ${item.name}`;
    cardTitle.textContent = item.name;
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    cardImage.addEventListener('click', () => openPopupCard(popupCard, cardImage, cardTitle));
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
  const cardContainer = document.querySelector('.places__list');
  initCardsArray.forEach((item) => {
      const cardElement = createCard(item, deleteCard, openPopupCard, likeCard);
      cardContainer.append(cardElement);
  });
}