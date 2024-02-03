import './pages/index.css';
import { getUserData, getCards } from './components/api.js';
import { fillUserData, addCards } from './components/pageLoad.js';
import {
  updateAvatarForm,
  updateAvatarButton,
  popupUpdateAvatar,
  handleUpdateAvatarSubmit,
} from './components/submitAvatar.js';
import {
  popupEdit,
  profileForm,
  handleProfileSubmit,
} from './components/submitProfile.js';
import {
  popupNewCard,
  newPlaceForm,
  handleCardSubmit,
} from './components/submitCard.js';
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from './components/validation.js';
import {
  openPopup,
  closePopup,
  fillProfileInputs,
  clearInputs,
} from './components/modal.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');

function handleEditClick() {
  openPopup(popupEdit);
  fillProfileInputs();
  clearValidation(profileForm, validationConfig);
}

function handleNewCardClick() {
  openPopup(popupNewCard);
  clearInputs(newPlaceForm);
  clearValidation(newPlaceForm, validationConfig);
}

function handleUpdateAvatarClick() {
  openPopup(popupUpdateAvatar);
  clearInputs(updateAvatarForm);
  clearValidation(updateAvatarForm, validationConfig);
}

profileEditButton.addEventListener('click', handleEditClick);
profileAddButton.addEventListener('click', handleNewCardClick);
updateAvatarButton.addEventListener('click', handleUpdateAvatarClick);

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(popup);
    }

    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

profileForm.addEventListener('submit', handleProfileSubmit);
newPlaceForm.addEventListener('submit', handleCardSubmit);
updateAvatarForm.addEventListener('submit', handleUpdateAvatarSubmit);

enableValidation(validationConfig);

Promise.all([getUserData(), getCards()])

  .then(([userData, cardsArray]) => {
    fillUserData(userData);
    const userId = userData._id;
    addCards(cardsArray, userId);
  })

  .catch((err) => console.log(err));
