import {Popup} from "./Popup.js"

export class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._formElement = this._popupElement.firstElementChild;
    this._handleSubmit = handleSubmit;

  }

  open = (id, card) => {
    this.id = id;
    this.card = card;
    super.open()
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      this._handleSubmit(evt, this.id)
    })
  }
}