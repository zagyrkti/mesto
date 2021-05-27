/*TODO uncomment*/
import './index.css';
import {Card} from "../components/Card.js";
/*import {initialCards} from "../utils/initial-cards.js";*/
import {FormValidator} from "../components/FormValidator.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithSubmit} from "../components/PopupWithSubmit.js";
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
  options,
  changeAvatarBtn,
  changeAvatarForm,
} from "../utils/constants.js";

/*------------------Classes-----------------*/
/*main*/
const profilePopupCE = new PopupWithForm(popupSelectors.profileEdit, handleProfileFormSubmit);
const addCardPopupCE = new PopupWithForm(popupSelectors.addCard, handleAddCardFormSubmit);
const changeAvatarPopup = new PopupWithForm(popupSelectors.changeAvatar, handleChangeAvatar);
const figurePopupCE = new PopupWithImage(popupSelectors.figure);
const profile = new UserInfo(profileSelectors.name, profileSelectors.status, profileSelectors.avatar);
const confirmation = new PopupWithSubmit(popupSelectors.confirmation, handleCardDelete)

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
  return new Card(itemData, cardTemplateSelector, figurePopupCE.open, handleLike, handleRemoveLike, id, confirmation.open).createCard();
}

/*------------------handlers------------------*/

function handleLike(id) {
  api.setLike(id)
    .then((cardData) => {
      this.cardLikeNumber.textContent = cardData.likes.length
    })
}

function handleRemoveLike(id) {
  api.removeLike(id)
    .then((cardData) => {
      this.cardLikeNumber.textContent = cardData.likes.length
    })
}

function handleProfileFormSubmit(evt, {name, status}) {
  evt.preventDefault();
  this.processing(true);
  api.setUser({name: name, about: status})
    .then((userData) => {
      profile.setUserInfo(userData)
    })
    .finally(() => {
      profilePopupCE.close();
      this.processing(false);
    })
    .catch(console.log)

}

function handleAddCardFormSubmit(evt, {name, link}) {
  evt.preventDefault();
  this.processing(true);
  api.addCard(name, link)
    .then((cardData) => {
      const card = createCard(cardData, profile.getId());
      section.addItems(card);
    })
    .finally(() => {
      addCardPopupCE.close();
      this.processing(false);
    })
    .catch(console.log)

}

function handleChangeAvatar(evt, {link}) {
  evt.preventDefault();
  this.processing(true);
  api.setUserAvatar(link)
    .then((data) => {
      profile.setUserAvatar(data);
    })
    .finally(() => {
      changeAvatarPopup.close();
      this.processing(false);
    })
    .catch(console.log)

}

function handleCardDelete(evt, id) {
  evt.preventDefault();

  api.deleteCard(id)
    .then(() => {
      this.card.remove()
      this.card = null;
    })
    .catch(console.log)
  /*отзывчивость лучше*/
  this.close();
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
      .catch(console.log)
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
confirmation.setEventListeners();

/*------------------invocations------------------*/

addCardFormValidator.enableValidation();
profileEditFormValidator.enableValidation();
changeAvatarFormValidator.enableValidation();


