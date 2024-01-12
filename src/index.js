import './pages/index.css';

import { initialCards } from './cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

//const editProfileForm = document.forms.edit-profile;
//const newPlaceForm = document.forms.new-place;

function createCard(item, deleteCard, openPopup) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button'); 
  cardImage.setAttribute('src', item.link);
  cardImage.setAttribute('alt', `Изображение локации ${item.name}`);
  cardTitle.textContent = item.name;
  deleteButton.addEventListener('click', () => deleteCard(cardElement));
  cardImage.addEventListener('click', () => openPopup(popupImage));
  return cardElement;
}

function addCards(initCardsArray, deleteCard) {
  initCardsArray.forEach((item) => {
    const cardElement = createCard(item, deleteCard, openPopup);
    cardContainer.append(cardElement);
  });
}

function deleteCard(card) {
  card.remove();
}

addCards(initialCards, deleteCard);

function openPopup(evt) {
  evt.classList.add('popup_is-opened');
  const popupCloseButton = evt.querySelector('.popup__close');

  popupCloseButton.addEventListener('click', closePopup);
  evt.addEventListener('click', closePopupOverlay);
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup() {
  const activePopup = document.querySelector('.popup_is-opened');
  activePopup.classList.remove('popup_is-opened');
  
  activePopup.removeEventListener('click', closePopup);
  activePopup.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closePopup();
  }
}

profileEditButton.addEventListener('click', () => openPopup(popupEdit));
profileAddButton.addEventListener('click', () => openPopup(popupNewCard));



const formElement = document.querySelector('[name="edit-profile"]');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

function handleFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);