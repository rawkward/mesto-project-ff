import { profileTitle, profileDescription, profileFormElement, profileNameInput, profileJobInput } from "./submitProfile";
import { cardFormElement, cardNameInput, cardLinkInput } from "./submitCard";

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener('keydown', closePopupEsc);
}

export function fillProfileInputs() {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
}

export function clearCardInputs() {
  cardNameInput.value = '';
  cardLinkInput.value = '';
}

export function fillCardData(cardImage, cardTitle) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardTitle.textContent;
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    closePopup(activePopup);
  }
}
