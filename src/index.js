import './pages/index.css';
import { getUserData, getCards } from './components/api.js';
import {
  updateAvatarForm,
  updateAvatarButton,
  popupUpdateAvatar,
  handleUpdateAvatarSubmit,
} from './components/submitAvatar.js';
import {
  popupEdit,
  profileForm,
  handleProfileSubmit, profileNameInput, profileJobInput, profileTitle, profileDescription
} from './components/submitProfile.js';
import { createCard, deleteCard, handleImageClick, likeCard, cardContainer } from './components/card.js';
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
  closePopup
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
  newPlaceForm.reset();
  clearValidation(newPlaceForm, validationConfig);
}

function handleUpdateAvatarClick() {
  openPopup(popupUpdateAvatar);
  updateAvatarForm.reset();
  clearValidation(updateAvatarForm, validationConfig);
}

function fillProfileInputs() {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
}

const fillUserData = (user) => {
  updateAvatarButton.style = `background-image: url(${user.avatar})`;
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
};

function addCards(CardsArray, userId) {
  CardsArray.forEach((cardObject) => {
    const cardElement = createCard(
      cardObject,
      userId,
      deleteCard,
      handleImageClick,
      likeCard
    );
    cardContainer.append(cardElement);
  });
}

enableValidation(validationConfig);

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

Promise.all([getUserData(), getCards()])

  .then(([userData, cardsArray]) => {
    fillUserData(userData);
    const userId = userData._id;
    addCards(cardsArray, userId);
  })

  .catch((err) => console.log(err));
