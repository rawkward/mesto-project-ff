import './pages/index.css';

import { initialCards } from './components/cards.js';

import { createCard, deleteCard } from './components/card.js';

import { openPopup, closePopup } from './components/modal.js';

import { handleFormSubmit } from './components/submit.js';

const cardContainer = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

const formElement = document.querySelector('[name="edit-profile"]');

function addCards(initCardsArray, deleteCard) {
    initCardsArray.forEach((item) => {
        const cardElement = createCard(item, deleteCard, openPopup);
        cardContainer.append(cardElement);
    });
}

addCards(initialCards, deleteCard);

profileEditButton.addEventListener('click', () => openPopup(popupEdit));
profileAddButton.addEventListener('click', () => openPopup(popupNewCard));

formElement.addEventListener('submit', handleFormSubmit);