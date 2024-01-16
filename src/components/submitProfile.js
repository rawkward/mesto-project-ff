import { closePopup } from './modal';

export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');

export const popupEdit = document.querySelector('.popup_type_edit');

export const profileFormElement = document.querySelector('[name="edit-profile"]');
export const profileNameInput = profileFormElement.querySelector('.popup__input_type_name');
export const profileJobInput = profileFormElement.querySelector('.popup__input_type_description');

export function handleProfileSubmit(evt) {
  evt.preventDefault();

  const name = profileNameInput.value;
  const job = profileJobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  closePopup(popupEdit);
}