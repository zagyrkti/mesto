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

const options = {
  token: "29656b2d-ee52-401a-a717-4267ea0b7d96",
  cardsUrl: "https://mesto.nomoreparties.co/v1/cohort-24/cards",
  userUrl: "https://mesto.nomoreparties.co/v1/cohort-24/users/me",
}
const test = "https://storage.yandexcloud.net/zrnpxr-pictures/colorful.jpg"
/*------------------Classes-----------------*/

const api = new Api(options)

const profilePopupCE = new PopupWithForm(popupSelectors.profileEdit, handleProfileFormSubmit);
const addCardPopupCE = new PopupWithForm(popupSelectors.addCard, handleAddCardFormSubmit);
const figurePopupCE = new PopupWithImage(popupSelectors.figure);
const profile = new UserInfo(profileSelectors.name, profileSelectors.status);

const section = api.getCards()
  .then((cardsData) => {
    cardsData.splice(6);
    const section = new Section({itemsData: cardsData, renderer: renderer}, cardsContainerSelector);
    function renderer(itemsData) {
      itemsData.forEach((itemData) => {
        const card = createCard(itemData);
        section.addItems(card);
      })
    }
    section.renderItems();
    return section;
  })



/*const section = new Section({itemsData: initialCards, renderer: renderer}, cardsContainerSelector);*/

const addCardFormValidator = new FormValidator(selectorConfig, addCardForm)
const profileEditFormValidator = new FormValidator(selectorConfig, profileEditForm);


/*------------------functions------------------*/

function handleProfileFormSubmit(evt, {name, status}) {
  evt.preventDefault();
  /*paste info from inputs to profile section*/
  profile.setUserInfo(name, status)
  /*close popup*/
  profilePopupCE.close();
}

function createCard(itemData) {
  return new Card(itemData, cardTemplateSelector, figurePopupCE.open).createCard();
}

/*actions on add card form submit*/
function handleAddCardFormSubmit(evt, {name, link}) {
  evt.preventDefault();
  const itemData = {name: name, link: link}
  const card = createCard(itemData);
  section.addItems(card);
  addCardPopupCE.close();
}

/*function renderer(itemsData) {
  itemsData.forEach((itemData) => {
    const card = createCard(itemData);
    section.addItems(card);
  })
}*/

/*------------------event listeners------------------*/

/*profile popup open*/
profileEditBtn.addEventListener("click", () => {
  profilePopupCE.open();
  profileEditFormValidator.resetValidation()
  const userData = profile.getUserInfo()
  profilePopupCE.setInputValues(userData)
})

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

/*section.renderItems();*/
