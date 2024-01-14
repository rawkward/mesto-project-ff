import { openPopup, closePopup } from './modal';
import { createCard, deleteCard, likeCard, cardContainer } from './card';

export function handleCardSubmit(evt) {
  evt.preventDefault();

  const formElement = document.querySelector('[name="new-place"]');
  const nameInput = formElement.querySelector('.popup__input_type_card-name');
  const linkInput = formElement.querySelector('.popup__input_type_url');

  const name = nameInput.value;
  const link = linkInput.value;

  const item = {
    name,
    link,
  };

  const newCard = createCard(item, deleteCard, openPopup, likeCard);
  cardContainer.prepend(newCard);

  formElement.reset();

  closePopup();
}