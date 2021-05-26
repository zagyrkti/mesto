/*------------------Elements------------------*/

const profileEditBtn = document.querySelector(".profile__edit");
const profileEditForm = document.querySelector(".popup-form_type_profile-edit");

const addCardBtn = document.querySelector(".profile__add");
const addCardForm = document.querySelector(".popup-form_type_add-card");

/*------------------Selectors------------------*/

const cardTemplateSelector = ".card-template";
const cardsContainerSelector = ".cards";

const popupSelectors = {
  profileEdit : ".popup_type_profile-edit",
  addCard : ".popup_type_add-card",
  figure : ".popup_type_figure",
  changeAvatar : ".popup_type_change-avatar",
}

const profileSelectors = {
  name : ".profile__name",
  status : ".profile__status",
}

const selectorConfig = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__save',
  inactiveButtonClass: 'popup-form__save_disabled',
  inputErrorClass: 'popup-form__input_type_error',
};

/*------------------------------------*/

export {
  profileEditBtn,
  profileEditForm,
  addCardBtn,
  addCardForm,
  selectorConfig,
  popupSelectors,
  cardTemplateSelector,
  profileSelectors,
  cardsContainerSelector,
}

/*const consts = {
  profileEditBtn: document.querySelector(".profile__edit"),
  profileEditForm: document.querySelector(".popup-form_type_profile-edit"),
  addCardBtn: document.querySelector(".profile__add"),
  addCardForm: document.querySelector(".popup-form_type_add-card"),
}*/
