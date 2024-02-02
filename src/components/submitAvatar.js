import { saveAvatar } from "./api";
import { updateAvatarForm } from "./validation";
import { closePopup } from "./modal";

export const updateAvatarButton = document.querySelector('.profile__image');
export const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar');
const avatarLinkInput = updateAvatarForm.querySelector('.popup__input_type_url');

export function handleUpdateAvatarSubmit(evt) {
  evt.preventDefault();

  updateAvatarButton.style = `background-image: url(${avatarLinkInput.value})`;

  saveAvatar(avatarLinkInput.value)
    .catch(err => console.log(err));
  closePopup(popupUpdateAvatar);
}