const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

function createCard(item, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button'); 
  cardImage.setAttribute('src', item.link);
  cardImage.setAttribute('alt', `Изображение локации ${item.name}`);
  cardTitle.textContent = item.name;
  deleteButton.addEventListener('click', () => deleteCard(cardElement));
  return cardElement;
}

function addCards(initCardsArray, deleteCard) {
  initCardsArray.forEach((item) => {
    const cardElement = createCard(item, deleteCard);
    cardContainer.append(cardElement);
  });
}

function deleteCard(card) {
  card.remove();
}

addCards(initialCards, deleteCard);
