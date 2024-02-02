import { openPopup, closePopup } from './modal';
import { createCard, deleteCard, likeCard, cardContainer } from './card';
import { saveNewCard, userId } from './api';

export const popupNewCard = document.querySelector('.popup_type_new-card');

export const cardFormElement = document.querySelector('[name="new-place"]');
export const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
export const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');

export function handleCardSubmit(evt) {
  evt.preventDefault();

  const item = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
    likes: [],
    owner: {
      _id: userId
    }
  };

  saveNewCard(item.name, item.link)
  .then((res) => {
    item._id = res._id;
  })
  .catch(err => console.log(err));

  const newCard = createCard(item, deleteCard, openPopup, likeCard);
  cardContainer.prepend(newCard);

  cardFormElement.reset();

  closePopup(popupNewCard);
}