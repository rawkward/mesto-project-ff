import { openPopup, closePopup } from './modal';
import { createCard, deleteCard, likeCard, cardContainer } from './card';
import { saveNewCard, userId } from './api';

export const popupNewCard = document.querySelector('.popup_type_new-card');

export const cardFormElement = document.querySelector('[name="new-place"]');
export const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
export const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');

export function handleCardSubmit(evt) {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  const item = {
    name,
    link,
    likes: [],
    owner: {
      _id: userId
    }
  };

  const newCard = createCard(item, deleteCard, openPopup, likeCard);
  cardContainer.prepend(newCard);

  cardFormElement.reset();

  saveNewCard(name, link);

  closePopup(popupNewCard);
}