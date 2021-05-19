import {Popup} from "./Popup.js"

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imgElement = this._popupElement.querySelector(".popup-figure__image");
    this._captionElement = this._popupElement.querySelector(".popup-figure__caption");
  }

  open = (cardPhoto, cardTitle) => {
    this._imgElement.src = cardPhoto.src;
    this._imgElement.alt = cardPhoto.alt;
    this._captionElement.textContent = cardTitle.textContent;
    super.open();
  }
}