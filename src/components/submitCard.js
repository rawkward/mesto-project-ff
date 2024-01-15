import { openPopup, closePopup } from './modal';
import { createCard, deleteCard, likeCard, cardContainer } from './card';

export const cardFormElement = document.querySelector('[name="new-place"]');
export const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
export const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');

export function handleCardSubmit(evt) {
  evt.preventDefault();

  const activePopup = document.querySelector('.popup_is-opened');

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  const item = {
    name,
    link,
  };

  const newCard = createCard(item, deleteCard, openPopup, likeCard);
  newCard.alt = `Изображение локации ${item.name}`;
  cardContainer.prepend(newCard);

  cardFormElement.reset();

  closePopup(activePopup);
}