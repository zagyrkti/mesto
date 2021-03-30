let profileEditBtn = document.querySelector(".profile__edit");
let profileEditPopup = document.querySelector(".profile-edit-popup");
let profileEditPopupCloseBtn = document.querySelector(".profile-edit-popup__close");
let profileName = document.querySelector(".profile__name");
let profileStatus = document.querySelector(".profile__status");
let profileEditPopupName = document.querySelector(".profile-edit-popup__input_type_name");
let profileEditPopupStatus = document.querySelector(".profile-edit-popup__input_type_status");
let profileEditPopupForm = document.querySelector(".profile-edit-popup__form");

// profile popup
profileEditBtn.addEventListener("click", function () {
  profileEditPopup.classList.add("popup_opened");
  profileEditPopupName.value = profileName.textContent;
  profileEditPopupStatus.value = profileStatus.textContent;
})

profileEditPopupCloseBtn.addEventListener("click", function () {
  profileEditPopup.classList.remove("popup_opened");
})

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditPopupName.value;
  profileStatus.textContent = profileEditPopupStatus.value;
  profileEditPopup.classList.remove("popup_opened");
}

profileEditPopupForm.addEventListener('submit', formSubmitHandler);

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


