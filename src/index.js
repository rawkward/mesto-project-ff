import './pages/index.css';
import {
  getUserData,
  getCards,
  saveAvatar,
  saveNewCard,
  saveUserData,
} from './components/api.js';
import {
  createCard,
  deleteCard,
  handleImageClick,
  likeCard,
  cardContainer,
} from './components/card.js';
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from './components/validation.js';
import { openPopup, closePopup } from './components/modal.js';
import { renderLoading } from './components/utils.js';

let userId;

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');

const updateAvatarButton = document.querySelector('.profile__image');
const updateAvatarForm = document.forms['update-avatar'];
const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar');
const avatarLinkInput = updateAvatarForm.querySelector(
  '.popup__input_type_url'
);
const submitAvatarButton = updateAvatarForm.querySelector('.popup__button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileForm = document.forms['edit-profile'];
const profileNameInput = profileForm.querySelector('.popup__input_type_name');
const profileJobInput = profileForm.querySelector(
  '.popup__input_type_description'
);
const submitProfileButton = profileForm.querySelector('.popup__button');

const popupNewCard = document.querySelector('.popup_type_new-card');
const newPlaceForm = document.forms['new-place'];
const cardNameInput = newPlaceForm.querySelector(
  '.popup__input_type_card-name'
);
const cardLinkInput = newPlaceForm.querySelector('.popup__input_type_url');
const submitCardButton = newPlaceForm.querySelector('.popup__button');

const popupEdit = document.querySelector('.popup_type_edit');

function handleUpdateAvatarClick() {
  openPopup(popupUpdateAvatar);
  updateAvatarForm.reset();
  clearValidation(updateAvatarForm, validationConfig);
}

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

function handleUpdateAvatarSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, submitAvatarButton);

  saveAvatar(avatarLinkInput.value)
    .then(() => {
      updateAvatarButton.style = `background-image: url(${avatarLinkInput.value})`;
      closePopup(popupUpdateAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, submitAvatarButton));
}

function handleProfileSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, submitProfileButton);

  saveUserData(profileNameInput, profileJobInput)
    .then(() => {
      profileTitle.textContent = profileNameInput.value;
      profileDescription.textContent = profileJobInput.value;
      closePopup(popupEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, submitProfileButton));
}

function handleCardSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, submitCardButton);

  const newCardObject = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
    likes: [],
    owner: {
      _id: userId,
    },
  };

  saveNewCard(newCardObject.name, newCardObject.link)
    .then((res) => {
      newCardObject._id = res._id;
      const newCard = createCard(
        newCardObject,
        userId,
        deleteCard,
        handleImageClick,
        likeCard
      );
      cardContainer.prepend(newCard);
      newPlaceForm.reset();
      closePopup(popupNewCard);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, submitCardButton));
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
    userId = userData._id;
    addCards(cardsArray, userId);
  })

  .catch((err) => console.log(err));
