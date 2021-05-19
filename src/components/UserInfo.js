export class UserInfo {
  constructor(nameSelector, statusSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._statusSelector = document.querySelector(statusSelector);
  }

  getUserInfo() {
    return {name: this._nameElement.textContent, status: this._statusSelector.textContent};
  }

  setUserInfo(name, status) {
    this._nameElement.textContent = name;
    this._statusSelector.textContent = status;
  }

}