import {Popup} from "./Popup.js"

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._formElement = this._popupElement.firstElementChild;
    this._handleSubmit = handleSubmit;
    this._inputList = [...this._formElement.querySelectorAll(".popup-form__input")];
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

  close() {
    this._formElement.reset();
    super.close();
  }
}