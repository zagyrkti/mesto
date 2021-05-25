export class Api {
  constructor(options) {
    this._token = options.token;
    this._cardsUrl = options.cardsUrl;
    this._userUrl = options.userUrl;
  }

  getCards() {
    return fetch(this._cardsUrl, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  getUser() {
    return fetch(this._userUrl, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }


}