import { saveUserData } from './api';
import { closePopup } from './modal';

export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');

export const popupEdit = document.querySelector('.popup_type_edit');

export const profileFormElement = document.querySelector('[name="edit-profile"]');
export const profileNameInput = profileFormElement.querySelector('.popup__input_type_name');
export const profileJobInput = profileFormElement.querySelector('.popup__input_type_description');
const submitProfileButton = profileFormElement.querySelector('.popup__button');

export function handleProfileSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, submitProfileButton);

  const name = profileNameInput.value;
  const job = profileJobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  saveUserData()
  .catch(err => console.log(err))
  .finally(() => renderLoading(false, submitProfileButton));
  closePopup(popupEdit);
}

export function renderLoading(isLoading, submitButton) {
  if(isLoading) {
    submitButton.textContent = 'Сохранение...'
  }
  else {
    submitButton.textContent = 'Сохранить'
  }
}