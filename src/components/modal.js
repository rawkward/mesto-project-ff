import { profileTitle, profileDescription, formElement, nameInput, jobInput } from "./submitProfile";

export function openPopup(popup) {
  popup.classList.add('popup_is-animated');
  
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);

  const popupCloseButton = popup.querySelector('.popup__close');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  popupCloseButton.addEventListener('click', closePopup);
  popup.addEventListener('click', closePopupOverlay);
  document.addEventListener('keydown', closePopupEsc);
}

export function openPopupCard(evt, cardImage, cardTitle) {
  const popupImage = evt.querySelector('.popup__image');
  const popupCaption = evt.querySelector('.popup__caption');
  const popupCloseButton = evt.querySelector('.popup__close');

  evt.classList.add('popup_is-animated');
  evt.classList.add('popup_is-opened');

  popupImage.src = cardImage.src;
  popupCaption.textContent = cardTitle.textContent;

  popupCloseButton.addEventListener('click', closePopup);
  evt.addEventListener('click', closePopupOverlay);
  document.addEventListener('keydown', closePopupEsc);
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