let profileEditBtn = document.querySelector(".profile__edit");
let profileEditPopup = document.querySelector(".popup_type_profile-edit");
let profileEditPopupCloseBtn = document.querySelector(".popup-form__close_owner_profile-edit");
let profileName = document.querySelector(".profile__name");
let profileStatus = document.querySelector(".profile__status");
let profileEditPopupName = document.querySelector(".popup-form__input_data_profile-name");
let profileEditPopupStatus = document.querySelector(".popup-form__input_data_profile-status");
let profileEditForm = document.querySelector(".popup-form_type_profile-edit");

// profile popup-form
profileEditBtn.addEventListener("click", function () {
  profileEditPopup.classList.add("popup_opened");
  profileEditPopupName.value = profileName.textContent;
  profileEditPopupStatus.value = profileStatus.textContent;
})

profileEditPopupCloseBtn.addEventListener("click", function () {
  profileEditPopup.classList.remove("popup_opened");
})
function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditPopupName.value;
  profileStatus.textContent = profileEditPopupStatus.value;
  profileEditPopup.classList.remove("popup_opened");
}

profileEditForm.addEventListener('submit', profileFormSubmitHandler);

// Initial cards generation

const initialCards = [
  {
    name: "Сладости",
    link: "./images/sweets_4.jpg"
  },
  {
    name: "Вертушки",
    link: "./images/windmills.jpg"
  },
  {
    name: "Пряности",
    link: "images/spice.jpg"
  },
  {
    name: "Плошки",
    link: "./images/plates.jpg"
  },
  {
    name: "Фонарики",
    link: "./images/lantern.jpg"
  },
  {
    name: "Базар",
    link: "./images/marketplace.jpg"
  },
];

const cardTemplate = document.querySelector(".card-template").content;
const cardsContainer = document.querySelector(".cards");

initialCards.forEach((item) => {
  const cardItem = cardTemplate.querySelector(".cards__item").cloneNode(true);
  cardItem.querySelector(".cards__photo").src = item.link;
  cardItem.querySelector(".cards__title").textContent = item.name;
  cardsContainer.prepend(cardItem);
})

// add card block
const addCardBtn = document.querySelector(".profile__add");
const addCardPopup = document.querySelector(".popup_type_add-card");

addCardBtn.addEventListener("click", function () {
  addCardPopup.classList.add("popup_opened");
})

const addCardCloseBtn = document.querySelector(".popup-form__close_owner_add-card");

addCardCloseBtn.addEventListener("click", function () {
  addCardPopup.classList.remove("popup_opened");
})

const addCardForm = document.querySelector(".popup-form_type_add-card");
const addCardName = document.querySelector(".popup-form__input_data_card-name");
const addCardLink = document.querySelector(".popup-form__input_data_card-link");

function addCardFormSubmitHandler(evt) {
  evt.preventDefault();
  const cardItem = cardTemplate.querySelector(".cards__item").cloneNode(true);
  cardItem.querySelector(".cards__photo").src = addCardLink.value;
  cardItem.querySelector(".cards__title").textContent = addCardName.value;
  cardsContainer.prepend(cardItem);
  addCardPopup.classList.remove("popup_opened");
}

addCardForm.addEventListener('submit', addCardFormSubmitHandler);
