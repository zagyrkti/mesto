/*TODO uncomment*/
/*import './index.css';*/
import {Card} from "../components/Card.js";
import {initialCards} from "../utils/initial-cards.js";
import {FormValidator} from "../components/FormValidator.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {Section} from "../components/Section.js";
import {Api} from "../components/Api.js";
import {
  profileEditBtn,
  profileEditForm,
  addCardBtn,
  addCardForm,
  selectorConfig,
  popupSelectors,
  cardTemplateSelector,
  profileSelectors,
  cardsContainerSelector,
} from "../utils/constants.js";
/*-----------------test-----------------*/

const avatarSelector = ".profile__img";
const changeAvatarBtn = document.querySelector(".profile__avatar")
const changeAvatarForm = document.querySelector(".popup-form_type_change-avatar");

const options = {
  token: "29656b2d-ee52-401a-a717-4267ea0b7d96",
  cardsUrl: "https://mesto.nomoreparties.co/v1/cohort-24/cards",
  userUrl: "https://mesto.nomoreparties.co/v1/cohort-24/users/me",
  avatarUrl: "https://mesto.nomoreparties.co/v1/cohort-24/users/me/avatar",
  likesUrl: "https://mesto.nomoreparties.co/v1/cohort-24/cards/likes",
  headers: {
    authorization: "29656b2d-ee52-401a-a717-4267ea0b7d96",
    'Content-Type': 'application/json',
  }
}
const test = "https://storage.yandexcloud.net/zrnpxr-pictures/colorful.jpg"

/*------------------Classes-----------------*/
/*main*/
const profilePopupCE = new PopupWithForm(popupSelectors.profileEdit, handleProfileFormSubmit);
const addCardPopupCE = new PopupWithForm(popupSelectors.addCard, handleAddCardFormSubmit);
const changeAvatarPopup = new PopupWithForm(popupSelectors.changeAvatar, handleChangeAvatar);
const figurePopupCE = new PopupWithImage(popupSelectors.figure);
const profile = new UserInfo(profileSelectors.name, profileSelectors.status, avatarSelector);

/*service*/
const api = new Api(options)
const section = new Section(renderer, cardsContainerSelector);
const addCardFormValidator = new FormValidator(selectorConfig, addCardForm)
const profileEditFormValidator = new FormValidator(selectorConfig, profileEditForm);
const changeAvatarFormValidator = new FormValidator(selectorConfig, changeAvatarForm);

/*------------------functions------------------*/

/*card renderer*/
function renderer(itemsData) {
  const id = profile.getId();
  itemsData.forEach((itemData) => {
    const card = createCard(itemData, id);
    section.addItems(card);
  })
}

function createCard(itemData, id) {
  return new Card(itemData, cardTemplateSelector, figurePopupCE.open, handleLike, handleRemoveLike, id).createCard();
}

/*------------------handlers------------------*/

function handleLike(id) {
 api.setLike(id)
   .then((cardData) => {
     this._cardLikeNumber.textContent = cardData.likes.length
   })
}

function handleRemoveLike(id) {
  api.removeLike(id)
    .then((cardData) => {
      this._cardLikeNumber.textContent = cardData.likes.length
    })
}

function handleProfileFormSubmit(evt, {name, status}) {
  evt.preventDefault();
  api.setUser({name: name, about: status})
    .then((userData) => {
      profile.setUserInfo(userData)
    })
  profilePopupCE.close();
}

function handleAddCardFormSubmit(evt, {name, link}) {
  evt.preventDefault();
  api.addCard(name, link)
    .then((cardData) => {
      const card = createCard(cardData);
      section.addItems(card);
    })
  addCardPopupCE.close();
}

function handleChangeAvatar(evt, {link}) {
  evt.preventDefault();
  api.setUserAvatar(link)
    .then((data) => {
      profile.setUserAvatar(data);
    })
  changeAvatarPopup.close();
}

/*------------------initial data loading------------------*/

/*initial cards loading from server*/

/*get user data from server*/
api.getUser()
  .then((userData) => {
    profile.setUserInfo(userData);
    profile.setUserAvatar(userData);
    profile.setId(userData)
    api.getCards()
      .then((cardsData) => {
        /*cardsData.splice(6);*/
        cardsData.reverse();
        section.renderItems(cardsData);
      })
  })

/*------------------event listeners------------------*/

/*profile popup open*/
profileEditBtn.addEventListener("click", () => {
  profilePopupCE.open();
  profileEditFormValidator.resetValidation()
  const userData = profile.getUserInfo()
  profilePopupCE.setInputValues(userData)
})

/*add card popup open*/
addCardBtn.addEventListener("click", () => {
  addCardPopupCE.open();
  addCardFormValidator.resetValidation();
});

/*change avatar*/
changeAvatarBtn.addEventListener("click", () => {
  changeAvatarPopup.open()
  changeAvatarFormValidator.resetValidation();

})


addCardPopupCE.setEventListeners();
changeAvatarPopup.setEventListeners();
figurePopupCE.setEventListeners();
profilePopupCE.setEventListeners();

/*------------------invocations------------------*/

addCardFormValidator.enableValidation();
profileEditFormValidator.enableValidation();
changeAvatarFormValidator.enableValidation();

/*------------------render------------------*/
/*const section = new Section({itemsData: initialCards, renderer: renderer}, cardsContainerSelector);*/

/*function renderer(itemsData) {
  itemsData.forEach((itemData) => {
    const card = createCard(itemData);
    section.addItems(card);
  })
}*/

/*section.renderItems();*/

