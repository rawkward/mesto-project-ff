import { profileTitle, profileDescription } from "./submitProfile";

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

  .then(user => {
    fillUserData(user);
  })

  .catch(err => console.log(err));
}

const fillUserData = (user) => {
  profileAvatar.style = `background-image: url(${user.avatar})`;
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })

    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .then(cards => {
      console.log(cards);
      fillInitialCards(cards);
    })
}

const fillInitialCards = (cards) => {
  
}