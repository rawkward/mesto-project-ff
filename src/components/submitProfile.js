import { closePopup } from './modal';

export function handleProfileSubmit(evt) {
  evt.preventDefault();

  const formElement = document.querySelector('[name="edit-profile"]');
  const nameInput = formElement.querySelector('.popup__input_type_name');
  const jobInput = formElement.querySelector('.popup__input_type_description');

  const name = nameInput.value;
  const job = jobInput.value;

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  closePopup();
}