import {Card} from "./Card.js";
import {initialCards} from "./initial-cards.js";
import {FormValidator} from "./FormValidator.js";

const selectorConfig = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__save',
  inactiveButtonClass: 'popup-form__save_disabled',
  inputErrorClass: 'popup-form__input_type_error',
};

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

const profileEditFormValidator = new FormValidator(selectorConfig, profileEditForm);
profileEditFormValidator.enableValidation()

/*profile popup open*/
profileEditBtn.addEventListener("click", () => {
  /*open popup*/
  openPopupForm(profileEditPopup)
  profileEditFormValidator.resetValidation()
  /*get data from profile and paste to inputs*/
  profileEditPopupName.value = profileName.textContent;
  profileEditPopupStatus.value = profileStatus.textContent;
})

/*profile popup close*/
profileEditPopupCloseBtn.addEventListener("click", () => closePopup(profileEditPopup))

/*profile popup action on submit*/
function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  /*paste info from inputs to profile section*/
  profileName.textContent = profileEditPopupName.value;
  profileStatus.textContent = profileEditPopupStatus.value;
  /*close popup*/
  closePopup(profileEditPopup);
}

profileEditForm.addEventListener('submit', profileFormSubmitHandler)

const cardsContainer = document.querySelector(".cards");

const popupFigure = document.querySelector(".popup_type_figure");
const popupFigureImg = document.querySelector(".popup-figure__image");
const figCaption = document.querySelector(".popup-figure__caption");


initialCards.forEach((itemData) => {
  prependToCardsContainer(new Card(itemData, ".card-template", handleCardClick).createCard());
})

/* add card block*/
const addCardBtn = document.querySelector(".profile__add");
const addCardPopup = document.querySelector(".popup_type_add-card");
const addCardForm = document.querySelector(".popup-form_type_add-card");

const addCardFormValidator = new FormValidator(selectorConfig, addCardForm)
addCardFormValidator.enableValidation()

/*add card popup open*/
addCardBtn.addEventListener("click", () => {
  openPopupForm(addCardPopup)
  addCardFormValidator.resetValidation()
});

/*add card popup close*/
const addCardCloseBtn = document.querySelector(".popup-form__close_owner_add-card");
addCardCloseBtn.addEventListener("click", () => closePopup(addCardPopup))

/*add card form elements*/

const addCardName = document.querySelector(".popup-form__input_data_card-name");
const addCardLink = document.querySelector(".popup-form__input_data_card-link");

/*actions on add card form submit*/
function addCardFormSubmitHandler(evt) {
  evt.preventDefault();
  const itemData = {name: addCardName.value, link: addCardLink.value}
  const card = new Card(itemData, ".card-template", handleCardClick).createCard()
  prependToCardsContainer(card);
  closePopup(addCardPopup);
}


addCardForm.addEventListener('submit', addCardFormSubmitHandler);

function openPopup(element) {
  element.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}

function closePopup(element) {
  element.classList.remove("popup_opened");
  element.classList.add("popup_closed");
  document.removeEventListener("keydown", closeByEsc);
}

/*fade out for popups
used to avoid visibility hidden*/
document.addEventListener('animationend', (evt) => {
  if (evt.animationName === 'fade-out') {
    evt.target.classList.remove('popup_closed');
  }
});



function prependToCardsContainer(cardItem) {
  cardsContainer.prepend(cardItem);
}

/* close photo figure*/
const figureCloseBtn = document.querySelector(".popup-figure__close");
figureCloseBtn.addEventListener("click", () => closePopup(popupFigure))

/*close by click*/
const popupList = [...document.querySelectorAll(".popup")];
popupList.forEach((element) => {
  /*mousedown for UX\click slip*/
  element.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(element);
    }
  })
})

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened")
    closePopup(popup)
  }
}



function resetForm(popupElement) {
  const firstElementChild = popupElement.firstElementChild;
  /*check if firstElementChild is form*/
  if (firstElementChild && firstElementChild.classList.contains("popup-form")) {
    firstElementChild.reset();
  }
}

function openPopupForm(element) {
  resetForm(element);
  openPopup(element)
}

function handleCardClick (cardPhoto, cardTitle) {
  openPopup(popupFigure);
  /*get image data pass to figure*/
  popupFigureImg.src = cardPhoto.src;
  popupFigureImg.alt = cardPhoto.alt;
  figCaption.textContent = cardTitle.textContent;
}