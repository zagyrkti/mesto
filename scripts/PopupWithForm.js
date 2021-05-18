import {Popup} from "./Popup.js"

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._formElement = this._popupElement.firstElementChild;
    this._handleSubmit = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();

  }

}