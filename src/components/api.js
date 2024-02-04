export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-5',
  headers: {
    authorization: '261e0281-f248-49c7-9896-df2c61729839',
    'Content-Type': 'application/json',
  },
};

const handleServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => handleServerResponse(res));
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => handleServerResponse(res));
};

export const saveAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then((res) => handleServerResponse(res));
};

export const saveUserData = (profileNameInput, profileJobInput) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileNameInput.value,
      about: profileJobInput.value,
    }),
  }).then((res) => handleServerResponse(res));
};

export const saveNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then((res) => handleServerResponse(res));
};

export const deleteCardRequest = (cardObject) => {
  return fetch(`${config.baseUrl}/cards/${cardObject._id}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => handleServerResponse(res));
};

export const addLikeCardRequest = (cardObject) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardObject._id}`, {
    method: 'PUT',
    headers: config.headers,
  }).then((res) => handleServerResponse(res));
};

export const removeLikeCardRequest = (cardObject) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardObject._id}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => handleServerResponse(res));
};
