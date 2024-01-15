import './pages/index.css';
import { initialCards } from './components/cards.js';
import { addCards, deleteCard, likeCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { handleProfileSubmit } from './components/submitProfile.js';
import { handleCardSubmit } from './components/submitCard.js';


const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

const formProfile = document.querySelector('[name="edit-profile"]');
const formCard = document.querySelector('[name="new-place"]');

const popups = document.querySelectorAll('.popup')


addCards(initialCards, deleteCard, likeCard);

profileEditButton.addEventListener('click', () => openPopup(popupEdit));
profileAddButton.addEventListener('click', () => openPopup(popupNewCard));

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

formProfile.addEventListener('submit', handleProfileSubmit);
formCard.addEventListener('submit', handleCardSubmit);
