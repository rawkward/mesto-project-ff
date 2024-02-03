import { openPopup, closePopup } from './modal';
import { createCard, deleteCard, likeCard, cardContainer } from './card';
import { saveNewCard, userId } from './api';
import { renderLoading } from './submitProfile';

export const popupNewCard = document.querySelector('.popup_type_new-card');

export const newPlaceForm = document.forms['new-place'];
export const cardNameInput = newPlaceForm.querySelector('.popup__input_type_card-name');
export const cardLinkInput = newPlaceForm.querySelector('.popup__input_type_url');
const submitCardButton = newPlaceForm.querySelector('.popup__button');

export function handleCardSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, submitCardButton);

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
  .catch(err => console.log(err))
  .finally(() => renderLoading(false, submitCardButton));

  const newCard = createCard(item, deleteCard, openPopup, likeCard);
  cardContainer.prepend(newCard);

  newPlaceForm.reset();

  closePopup(popupNewCard);
}