import {Card} from "./Card.js";
import {initialCards} from "./initial-cards.js";
import {resetValidation} from "./validate.js";
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

/*profile popup open*/
profileEditBtn.addEventListener("click", () => {
  /*open popup*/
  openPopupForm(profileEditPopup)
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

const cardTemplate = document.querySelector(".card-template").content;
const cardsContainer = document.querySelector(".cards");

const popupFigure = document.querySelector(".popup_type_figure");
const popupFigureImg = document.querySelector(".popup-figure__image");
const figCaption = document.querySelector(".popup-figure__caption");

/*generator of initial cards*/
/*initialCards.forEach((item) => {
  prependToCardsContainer(createCard(item));
})*/

initialCards.forEach((itemData) => {
  prependToCardsContainer(new Card(itemData, ".card-template", handleCardClick).createCard());
})

/* add card block*/
const addCardBtn = document.querySelector(".profile__add");
const addCardPopup = document.querySelector(".popup_type_add-card");

/*add card popup open*/
addCardBtn.addEventListener("click", () => openPopupForm(addCardPopup));

/*add card popup close*/
const addCardCloseBtn = document.querySelector(".popup-form__close_owner_add-card");
addCardCloseBtn.addEventListener("click", () => closePopup(addCardPopup))

/*add card form elements*/
const addCardForm = document.querySelector(".popup-form_type_add-card");
const addCardName = document.querySelector(".popup-form__input_data_card-name");
const addCardLink = document.querySelector(".popup-form__input_data_card-link");

/*actions on add card form submit*/
function addCardFormSubmitHandler(evt) {
  evt.preventDefault();
  const card = createCard({name: addCardName.value, link: addCardLink.value});
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
  /*Здравствуйте, куратор написала что у вас там весело ), спасибо за оперативный фидбек, дедлайн близко )*/
  /*popup_closed использовал так для повышения accessibility, сделана нестандартная реализация*/
  /*не через visibility a через display: none -> display: flex и анимацию*/
  /*так как плавное закрытие в этом случае сделать сложнее используется popup_closed*/
  /*на классе висит анимация fade out, плавное закрытие*/
  /*popup_closed удаляется после запуска анимации fade out в обработчике анимации - 99 строка*/
  /*перенес поближе, извиняюсь за хреновую структуру*/
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

/*function createCard(cardData) {
  /!*clone template*!/
  const cardItem = cardTemplate.querySelector(".cards__item").cloneNode(true);
  const cardPhoto = cardItem.querySelector(".cards__photo");
  /!*get data from parameter object and pass it to elements properties  *!/
  cardPhoto.src = cardData.link;
  cardPhoto.alt = cardData.name;
  cardItem.querySelector(".cards__title").textContent = cardData.name;

  /!*card delete*!/
  const cardsDeleteBtn = cardItem.querySelector(".cards__delete");
  cardsDeleteBtn.addEventListener("click", () => cardItem.remove())

  /!*card like*!/
  const cardLikeBtn = cardItem.querySelector(".cards__like");
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("cards__like_clicked");
  })

  /!*fullscreen photo by click on card's img*!/
  cardPhoto.addEventListener("click", () => {
    /!*open figure popup*!/
    openPopup(popupFigure);
    /!*get image data pass to figure*!/
    popupFigureImg.src = cardPhoto.src;
    popupFigureImg.alt = cardPhoto.alt;
    figCaption.textContent = cardItem.querySelector(".cards__title").textContent;
  })

  return cardItem;
}*/

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
  resetValidation(element);
  openPopup(element)
}

function handleCardClick (cardPhoto, cardTitle) {
  openPopup(popupFigure);
  /*get image data pass to figure*/
  popupFigureImg.src = cardPhoto.src;
  popupFigureImg.alt = cardPhoto.alt;
  figCaption.textContent = cardTitle.textContent;
}