export function createCard(item, deleteCard, openPopup) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button'); 
    const popupImage = document.querySelector('.popup_type_image');
    
    cardImage.setAttribute('src', item.link);
    cardImage.setAttribute('alt', `Изображение локации ${item.name}`);
    cardTitle.textContent = item.name;
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    cardImage.addEventListener('click', () => openPopup(popupImage));
    return cardElement;
  }

export function deleteCard(card) {
    card.remove();
}