import { profileTitle, profileDescription, formElement, nameInput, jobInput } from "./submitProfile";

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

export function openPopup(popup, cardImage, cardTitle) {

  const popupCloseButton = popup.querySelector('.popup__close');

  popup.classList.add('popup_is-animated');
  
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);

  popupCloseButton.addEventListener('click', closePopup);
  popup.addEventListener('click', closePopupOverlay);
  document.addEventListener('keydown', closePopupEsc);

  if (popup.classList.contains('popup_type_edit')) {
    openPopupProfile();
  }

  if (popup.classList.contains('popup_type_image')) {
    openPopupCard(cardImage, cardTitle);
  }
}

function openPopupProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function openPopupCard(cardImage, cardTitle) {
  popupImage.src = cardImage.src;
  popupCaption.textContent = cardTitle.textContent;
}

export function closePopup() {
  const activePopup = document.querySelector('.popup_is-opened');

  resetForm(activePopup);

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

function resetForm(popup) {
  const form = popup.querySelector('.popup__form');
  if (form) {
    form.reset();
  }
}