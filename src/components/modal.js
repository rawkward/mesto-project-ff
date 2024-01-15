import { profileTitle, profileDescription, profileFormElement, profileNameInput, profileJobInput } from "./submitProfile";
import { cardFormElement, cardNameInput, cardLinkInput } from "./submitCard";

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

export function openPopup(popup, cardImage, cardTitle) {

  popup.classList.add("popup_is-opened");

  document.addEventListener('keydown', closePopupEsc);

  if (popup.classList.contains('popup_type_edit')) {
    openPopupProfile();
  }

  if (popup.classList.contains('popup_type_new-card')) {
    openPopupNewCard();
  }

  if (popup.classList.contains('popup_type_image')) {
    openPopupCard(cardImage, cardTitle);
  }
}

function openPopupProfile() {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
}

function openPopupNewCard() {
  cardNameInput.value = '';
  cardLinkInput.value = '';
}

function openPopupCard(cardImage, cardTitle) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardTitle.textContent;
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');

  popup.removeEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
        closePopup(popup)
    }

    if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
    }
  })

  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
  const activePopup = document.querySelector('.popup_is-opened');

  if (evt.key === 'Escape') {
    closePopup(activePopup);
  }
}
