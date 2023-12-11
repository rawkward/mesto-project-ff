const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

function addCards(initCardsArray, deleteFunction) {
    initCardsArray.forEach(item => {
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
        const cardImage = cardElement.querySelector('.card__image');
        const cardTitle = cardElement.querySelector('.card__title');
        const deleteButton = cardElement.querySelector('.card__delete-button');
        cardImage.setAttribute('src', item.link);
        cardTitle.textContent = item.name;
        cardContainer.append(cardElement);
        deleteButton.addEventListener('click', function() {
            deleteFunction(cardElement);
        })
    });
}

function deleteCard(card) {
    card.remove();
}

addCards(initialCards, deleteCard);
