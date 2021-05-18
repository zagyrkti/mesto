import {Card} from "./Card.js";
import {initialCards} from "./initial-cards.js";
import {FormValidator} from "./FormValidator.js";
import {Popup} from "./Popup.js";
import {PopupWithImage} from "./PopupWithImage.js";

const selectorConfig = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__save',
  inactiveButtonClass: 'popup-form__save_disabled',
  inputErrorClass: 'popup-form__input_type_error',
};

/*------------------Elements------------------*/
/*test*/
/*TODO delete*/
const profilePopupCE = new Popup(".popup_type_profile-edit");
const addCardPopupCE = new Popup(".popup_type_add-card");
const figurePopupCE = new PopupWithImage(".popup_type_figure");

/*test*/

/*profile section*/
const profileEditBtn = document.querySelector(".profile__edit");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
/*profile popup*/
const profileEditPopup = document.querySelector(".popup_type_profile-edit");
const profileEditPopupCloseBtn = document.querySelector(".popup-form__close_owner_profile-edit");
const profileEditPopupName = document.querySelector(".popup-form__input_data_profile-name");
const profileEditPopupStatus = document.querySelector(".popup-form__input_data_profile-status");
const profileEditForm = document.querySelector(".popup-form_type_profile-edit");

const cardsContainer = document.querySelector(".cards");
/*popup figure*/
const popupFigure = document.querySelector(".popup_type_figure");
const popupFigureImg = document.querySelector(".popup-figure__image");
const figCaption = document.querySelector(".popup-figure__caption");
const figureCloseBtn = document.querySelector(".popup-figure__close");
/*add card*/
const addCardBtn = document.querySelector(".profile__add");
const addCardPopup = document.querySelector(".popup_type_add-card");
const addCardForm = document.querySelector(".popup-form_type_add-card");
const addCardCloseBtn = document.querySelector(".popup-form__close_owner_add-card");
const addCardName = document.querySelector(".popup-form__input_data_card-name");
const addCardLink = document.querySelector(".popup-form__input_data_card-link");

const popupList = [...document.querySelectorAll(".popup")];

const addCardFormValidator = new FormValidator(selectorConfig, addCardForm)

const profileEditFormValidator = new FormValidator(selectorConfig, profileEditForm);

/*------------------functions------------------*/

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  /*paste info from inputs to profile section*/
  profileName.textContent = profileEditPopupName.value;
  profileStatus.textContent = profileEditPopupStatus.value;
  /*close popup*/
  profilePopupCE.close();
}

/*actions on add card form submit*/
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const itemData = {name: addCardName.value, link: addCardLink.value}
  const card = new Card(itemData, ".card-template", handleCardClick).createCard()
  prependToCardsContainer(card);
  addCardPopupCE.close();
}

/*function openPopup(element) {
  element.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}*/

/*function closePopup(element) {
  element.classList.remove("popup_opened");
  element.classList.add("popup_closed");
  document.removeEventListener("keydown", closeByEsc);
}*/

function prependToCardsContainer(cardItem) {
  cardsContainer.prepend(cardItem);
}

/*function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened")
    closePopup(popup)
  }
}*/

function resetForm(popupElement) {
  const firstElementChild = popupElement.firstElementChild;
  /*check if firstElementChild is form*/
  if (firstElementChild && firstElementChild.classList.contains("popup-form")) {
    firstElementChild.reset();
  }
}

/*
function openPopupForm(element) {
  resetForm(element);
  openPopup(element)
}*/

function handleCardClick (cardPhoto, cardTitle) {
  figurePopupCE.open(cardPhoto, cardTitle);
  /*get image data pass to figure*/
  /*popupFigureImg.src = cardPhoto.src;
  popupFigureImg.alt = cardPhoto.alt;
  figCaption.textContent = cardTitle.textContent;*/
}

/*------------------event listeners------------------*/

/*profile popup open*/
profileEditBtn.addEventListener("click", () => {
  /*open popup*/
  resetForm(profileEditPopup);
  profilePopupCE.open();
  /*openPopupForm(profileEditPopup)*/
  profileEditFormValidator.resetValidation()
  /*get data from profile and paste to inputs*/
  profileEditPopupName.value = profileName.textContent;
  profileEditPopupStatus.value = profileStatus.textContent;
})

/*profile popup close*/
/*profileEditPopupCloseBtn.addEventListener("click", () => profilePopupCE.close())*/
profilePopupCE.setEventListeners();

/*profile edit form submit*/
profileEditForm.addEventListener('submit', handleProfileFormSubmit)

/*add card popup open*/
addCardBtn.addEventListener("click", () => {
  resetForm(addCardPopup);
  addCardPopupCE.open();
  addCardFormValidator.resetValidation()
});

/*add card popup close*/
/*addCardCloseBtn.addEventListener("click", () => addCardPopupCE.close())*/
addCardPopupCE.setEventListeners();

addCardForm.addEventListener('submit', handleAddCardFormSubmit);

/*fade out for popups
used to avoid visibility hidden*/
/*document.addEventListener('animationend', (evt) => {
  if (evt.animationName === 'fade-out') {
    evt.target.classList.remove('popup_closed');
  }
});*/

/* close photo figure*/
/*figureCloseBtn.addEventListener("click", () => figurePopupCE.close())*/
figurePopupCE.setEventListeners()

/*------------------invocations------------------*/

/*close by click*/
/*popupList.forEach((element) => {
  /!*mousedown for UX\click slip*!/
  element.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      evt.target.classList.remove("popup_opened");
      evt.target.classList.add("popup_closed");
      document.removeEventListener("keydown", evt.target._closeByEsc);
    }
  })
})*/

addCardFormValidator.enableValidation()
profileEditFormValidator.enableValidation()

/*------------------render------------------*/

initialCards.forEach((itemData) => {
  prependToCardsContainer(new Card(itemData, ".card-template", figurePopupCE.open.bind(figurePopupCE)).createCard());
})