import {Popup} from "./Popup.js"

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._formElement = this._popupElement.firstElementChild;
    this._handleSubmit = handleSubmit;
    this._inputList = [...this._formElement.querySelectorAll(".popup-form__input")];
    this._save = this._formElement.querySelector(".popup-form__save")
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      this._handleSubmit(evt, this._getInputValues())
    })
  }

  _getInputValues() {
    const inputData = {};
    this._inputList.forEach((input) => {
      inputData[input.name] = input.value;
    })
    return inputData
  }

  setInputValues(data) {
    const inputs = {};
    this._inputList.forEach((input) => {
      inputs[input.name] = input;
    })
    for (let key in data) {
      if (inputs[key]) {
        inputs[key].value = data[key];
      }
    }
  }

  close() {
    this._formElement.reset();
    super.close();
  }

  processing(status) {
    if(status) {
      this._save.textContent = "Сохранение..."
      return
    }
    this._save.textContent = "Сохранить"
  }
}