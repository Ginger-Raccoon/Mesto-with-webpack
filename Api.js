class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getProfile() {
    return fetch(`${this.url}users/me`, {
      headers: this.headers
    })
      // Можно лучше
      // Повторяющийся код разбора ответа сервера можно вынести в отдельный метод класса
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  getCards() {
    return fetch(`${this.url}cards`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  patchProfile(name, job) {
    return fetch(`${this.url}users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

}