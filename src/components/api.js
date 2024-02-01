import { profileTitle, profileDescription } from "./submitProfile";
import { createCard, cardContainer, deleteCard, likeCard } from "./card";
import { openPopup } from "./modal";

export let userId = '';

const profileAvatar = document.querySelector('.profile__image');

export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-5',
  headers: {
    authorization: '261e0281-f248-49c7-9896-df2c61729839',
    'Content-Type': 'application/json'
  }
}

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })

  .then(res => {
    if (res.ok) {
      return res.json();
    };

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })

  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const saveUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileTitle.textContent,
      about: profileDescription.textContent
    })
  })

  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const saveNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  })

  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const deleteCardRequest = (cardObject) => {
  return fetch(`${config.baseUrl}/cards/${cardObject._id}`, {
    method: "DELETE",
    headers: config.headers
  })

  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

const fillUserData = (user) => {
  profileAvatar.style = `background-image: url(${user.avatar})`;
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
}

export function addCards(CardsArray) {
  CardsArray.forEach((cardObject) => {
    const cardElement = createCard(cardObject, deleteCard, openPopup, likeCard);
    cardContainer.append(cardElement);
  });
}

Promise.all([getUserData(), getCards()])

  .then(([userData, cardsArray]) => {
    fillUserData(userData);
    userId = userData._id;
    addCards(cardsArray);
  })

  .catch(err => console.log(err));
