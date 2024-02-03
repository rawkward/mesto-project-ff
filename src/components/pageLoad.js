import { profileTitle, profileDescription } from "./submitProfile";
import { createCard, cardContainer, deleteCard, likeCard } from "./card";
import { openPopup } from "./modal";
import { updateAvatarButton } from "./submitAvatar";

export const fillUserData = (user) => {
  updateAvatarButton.style = `background-image: url(${user.avatar})`;
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
}

export function addCards(CardsArray, userId) {
  CardsArray.forEach((cardObject) => {
    const cardElement = createCard(cardObject, userId, deleteCard, openPopup, likeCard);
    cardContainer.append(cardElement);
  });
}