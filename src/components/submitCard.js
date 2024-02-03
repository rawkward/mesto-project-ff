import { openPopup, closePopup } from './modal';
import { createCard, deleteCard, likeCard, cardContainer } from './card';
import { getUserData, saveNewCard} from './api';
import { renderLoading } from './submitProfile';

export const popupNewCard = document.querySelector('.popup_type_new-card');

export const newPlaceForm = document.forms['new-place'];
export const cardNameInput = newPlaceForm.querySelector('.popup__input_type_card-name');
export const cardLinkInput = newPlaceForm.querySelector('.popup__input_type_url');
const submitCardButton = newPlaceForm.querySelector('.popup__button');

// export function handleCardSubmit(evt) {
//   evt.preventDefault();

//   renderLoading(true, submitCardButton);

//   const newCardObject = {
//     likes: [],
//     owner: {},
//   };

//   getUserData()
//   .then(res => newCardObject.owner._id = res._id)
//   .catch(err => console.log(err));

//   saveNewCard(cardNameInput.value, cardLinkInput.value)
//   .then(() => {
//     newCardObject.name = cardNameInput.value;
//     newCardObject.link = cardLinkInput.value;
//   })
//   .catch(err => console.log(err))
//   .finally(() => renderLoading(false, submitCardButton));

//   const newCard = createCard(newCardObject, newCardObject.owner._id, deleteCard, openPopup, likeCard);
//   cardContainer.prepend(newCard);

//   newPlaceForm.reset();

//   closePopup(popupNewCard);
// }

export function handleCardSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, submitCardButton);

  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  
  getUserData()
  .then(res => {
    const userId = res._id;
    const newCardObject = {
      name: name,
      link: link,
      likes: [],
      owner: {
        _id: userId
      }
    };
    return saveNewCard(name, link)
      .then((res) => {
        newCardObject._id = res._id;
        const newCard = createCard(newCardObject, userId, deleteCard, openPopup, likeCard);
        cardContainer.prepend(newCard);
      });
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitCardButton);
      newPlaceForm.reset();
      closePopup(popupNewCard);
    });
}