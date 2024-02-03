import { saveAvatar } from "./api";
import { closePopup } from "./modal";
import { renderLoading } from "./submitProfile";

export const updateAvatarButton = document.querySelector('.profile__image');
export const updateAvatarForm = document.forms['update-avatar'];
export const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar');
const avatarLinkInput = updateAvatarForm.querySelector('.popup__input_type_url');
const submitAvatarButton = updateAvatarForm.querySelector('.popup__button');

export function handleUpdateAvatarSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, submitAvatarButton);

  saveAvatar(avatarLinkInput.value)
  .then(() => updateAvatarButton.style = `background-image: url(${avatarLinkInput.value})`)
  .catch(err => console.log(err))
  .finally(() => renderLoading(false, submitAvatarButton));

  closePopup(popupUpdateAvatar);
}