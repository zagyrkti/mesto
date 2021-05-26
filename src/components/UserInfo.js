export class UserInfo {
  constructor(nameSelector, statusSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._statusElement = document.querySelector(statusSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {name: this._nameElement.textContent, status: this._statusElement.textContent};
  }

  setUserInfo({name, about}) {
    this._nameElement.textContent = name;
    this._statusElement.textContent = about;
  }

  setUserAvatar({avatar}) {
    this._avatarElement.src = avatar;
  }

}