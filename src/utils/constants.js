const profileEditBtn = document.querySelector(".profile__edit");

const profileEditForm = document.querySelector(".popup-form_type_profile-edit");

const addCardBtn = document.querySelector(".profile__add");

const addCardForm = document.querySelector(".popup-form_type_add-card");

const selectorConfig = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__save',
  inactiveButtonClass: 'popup-form__save_disabled',
  inputErrorClass: 'popup-form__input_type_error',
};

export {
  profileEditBtn,
  profileEditForm,
  addCardBtn,
  addCardForm,
  selectorConfig,
}

/*const consts = {
  profileEditBtn: document.querySelector(".profile__edit"),
  profileEditForm: document.querySelector(".popup-form_type_profile-edit"),
  addCardBtn: document.querySelector(".profile__add"),
  addCardForm: document.querySelector(".popup-form_type_add-card"),
}*/
