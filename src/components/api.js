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

export const saveUserData = (profileNameInput, profileJobInput) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileNameInput.value,
      about: profileJobInput.value
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
    method: 'DELETE',
    headers: config.headers
  })

  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const addLikeCardRequest = (cardObject) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardObject._id}`, {
    method: 'PUT',
    headers: config.headers
  })

  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const removeLikeCardRequest = (cardObject) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardObject._id}`, {
    method: 'DELETE',
    headers: config.headers
  })

  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const saveAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar
    })
  })

  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}