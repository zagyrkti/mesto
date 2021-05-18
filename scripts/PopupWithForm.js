import {Popup} from "./Popup.js"

class PopupWithForm extends Popup {
 constructor(popupSelector, handleSubmit) {
   super(popupSelector);
   this._handleSubmit = handleSubmit;
 }


}