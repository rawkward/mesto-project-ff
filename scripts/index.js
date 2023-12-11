// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

function addCards(initCardsArray/*, removeCard*/) {
    initCardsArray.forEach(item => {
        const card = cardTemplate.querySelector('.card').cloneNode(true);
        const cardImage = card.querySelector('.card__image');
        const cardTitle = card.querySelector('.card__title');
        cardImage.setAttribute('src', item.link);
        cardTitle.textContent = item.name;
        cardContainer.append(card);
    });
}

addCards(initialCards);










// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
