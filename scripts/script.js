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
profileEditBtn.addEventListener("click", (evt) => {
  /*open popup*/
  openPopup(profileEditPopup);
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
initialCards.forEach((item) => {
  prependToCardsContainer(createCard(item));
})

/* add card block*/
const addCardBtn = document.querySelector(".profile__add");
const addCardPopup = document.querySelector(".popup_type_add-card");

/*add card popup open*/
addCardBtn.addEventListener("click", () => openPopup(addCardPopup))

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

/*fade out for popups
used to avoid visibility hidden*/
document.addEventListener('animationend', (evt) => {
  if (evt.animationName === 'fade-out') {
    evt.target.classList.remove('popup_closed');
  }
});

function openPopup(element) {
  resetValidation(element.firstElementChild);
  element.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}

function closePopup(element) {
  element.classList.remove("popup_opened");
  element.classList.add("popup_closed");
  document.removeEventListener("keydown", closeByEsc)
  element.firstElementChild.reset();
}

function createCard(cardData) {
  /*clone template*/
  const cardItem = cardTemplate.querySelector(".cards__item").cloneNode(true);

  /*get data from parameter object and pass it to elements properties  */
  cardItem.querySelector(".cards__photo").src = cardData.link;
  cardItem.querySelector(".cards__photo").alt = cardData.name;
  cardItem.querySelector(".cards__title").textContent = cardData.name;

  /*card delete*/
  const cardsDeleteBtn = cardItem.querySelector(".cards__delete");
  cardsDeleteBtn.addEventListener("click", () => cardItem.remove())

  /*card like*/
  const cardLikeBtn = cardItem.querySelector(".cards__like");
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("cards__like_clicked");
  })

  /*fullscreen photo by click on card's img*/
  cardItem.querySelector(".cards__photo").addEventListener("click", () => {
    /*open figure popup*/
    openPopup(popupFigure);
    /*get image data pass to figure*/
    popupFigureImg.src = cardItem.querySelector(".cards__photo").src;
    figCaption.textContent = cardItem.querySelector(".cards__title").textContent;
  })

  return cardItem;
}

function prependToCardsContainer(cardItem) {
  cardsContainer.prepend(cardItem);
}

/* close photo figure*/
const figureCloseBtn = document.querySelector(".popup-figure__close");
figureCloseBtn.addEventListener("click", () => closePopup(popupFigure))

/*close by click*/
const popupList = [...document.querySelectorAll(".popup")];
popupList.forEach((element) => {
  element.addEventListener("click", (evt) => {
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