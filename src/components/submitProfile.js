import { saveUserData } from './api';
import { closePopup } from './modal';
import { renderLoading } from './utils';

export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector(
  '.profile__description'
);

export const popupEdit = document.querySelector('.popup_type_edit');

export const profileForm = document.forms['edit-profile'];
export const profileNameInput = profileForm.querySelector(
  '.popup__input_type_name'
);
export const profileJobInput = profileForm.querySelector(
  '.popup__input_type_description'
);

const submitProfileButton = profileForm.querySelector('.popup__button');

export function handleProfileSubmit(evt) {
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
