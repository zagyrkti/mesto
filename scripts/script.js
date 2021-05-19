import {Card} from "./Card.js";
import {initialCards} from "./initial-cards.js";
import {FormValidator} from "./FormValidator.js";
import {PopupWithImage} from "./PopupWithImage.js";
import {PopupWithForm} from "./PopupWithForm.js";
import {UserInfo} from "./UserInfo.js";
import {Section} from "./Section.js";

const selectorConfig = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__save',
  inactiveButtonClass: 'popup-form__save_disabled',
  inputErrorClass: 'popup-form__input_type_error',
};

/*------------------Elements------------------*/

const profileEditBtn = document.querySelector(".profile__edit");

const profileEditForm = document.querySelector(".popup-form_type_profile-edit");

const addCardBtn = document.querySelector(".profile__add");

const addCardForm = document.querySelector(".popup-form_type_add-card");

const addCardFormValidator = new FormValidator(selectorConfig, addCardForm)

const profileEditFormValidator = new FormValidator(selectorConfig, profileEditForm);


/*------------------Classes-----------------*/

const profilePopupCE = new PopupWithForm(".popup_type_profile-edit", handleProfileFormSubmit);
const addCardPopupCE = new PopupWithForm(".popup_type_add-card", handleAddCardFormSubmit);
const figurePopupCE = new PopupWithImage(".popup_type_figure");
const profile = new UserInfo(".profile__name", ".profile__status");
const section = new Section({itemsData: initialCards, renderer: renderer}, ".cards");

/*------------------functions------------------*/

function handleProfileFormSubmit(evt, {name, status}) {
  evt.preventDefault();
  /*paste info from inputs to profile section*/
  profile.setUserInfo(name, status)
  /*close popup*/
  profilePopupCE.close();
}

/*actions on add card form submit*/
function handleAddCardFormSubmit(evt, {name, link}) {
  evt.preventDefault();
  const itemData = {name: name, link: link}
  const card = new Card(itemData, ".card-template", figurePopupCE.open).createCard()
  section.addItems(card);
  addCardPopupCE.close();
}

function renderer(itemsData) {
  itemsData.forEach((itemData) => {
    const card = new Card(itemData, ".card-template", figurePopupCE.open).createCard()
    section.addItems(card);
  })
}

/*------------------event listeners------------------*/

/*profile popup open*/
profileEditBtn.addEventListener("click", () => {
  /*open popup*/
  profilePopupCE.open();
  profileEditFormValidator.resetValidation()
  const userData = profile.getUserInfo()
  profilePopupCE.setInputValues(userData)
})

/*profile popup close*/
profilePopupCE.setEventListeners();

/*add card popup open*/
addCardBtn.addEventListener("click", () => {
  addCardPopupCE.open();
  addCardFormValidator.resetValidation()
});

addCardPopupCE.setEventListeners();

figurePopupCE.setEventListeners()

/*------------------invocations------------------*/

addCardFormValidator.enableValidation()
profileEditFormValidator.enableValidation()

/*------------------render------------------*/

section.renderItems();