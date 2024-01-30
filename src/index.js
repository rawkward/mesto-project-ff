import './pages/index.css';
import { initialCards } from './components/cards.js';
import { addCards, deleteCard, likeCard } from './components/card.js';
import { openPopup, closePopup, fillProfileInputs, clearCardInputs } from './components/modal.js';
import { popupEdit, profileFormElement, handleProfileSubmit } from './components/submitProfile.js';
import { popupNewCard, cardFormElement, handleCardSubmit } from './components/submitCard.js';

import { enableValidation, clearValidation, profileForm, newPlaceForm, validationConfig } from './components/validation.js';


const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup')


addCards(initialCards, deleteCard, likeCard);

function handleEditClick() {
  openPopup(popupEdit);
  fillProfileInputs();
  clearValidation(profileForm, validationConfig);
};

function handleNewCardClick() {
  openPopup(popupNewCard);
  clearCardInputs();
  clearValidation(newPlaceForm, validationConfig);
};

profileEditButton.addEventListener('click', handleEditClick);
profileAddButton.addEventListener('click', handleNewCardClick);

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(popup);
    }

    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
});

profileFormElement.addEventListener('submit', handleProfileSubmit);
cardFormElement.addEventListener('submit', handleCardSubmit);

enableValidation(validationConfig);