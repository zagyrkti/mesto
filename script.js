let profileEditBtn = document.querySelector(".profile__edit");
let profileEditPopup = document.querySelector(".profile-edit-popup");
let profileEditPopupCloseBtn = document.querySelector(".profile-edit-popup__close");
let profileName = document.querySelector(".profile__name");
let profileStatus = document.querySelector(".profile__status");
let profileEditPopupName = document.querySelector(".profile-edit-popup__name");
let profileEditPopupStatus = document.querySelector(".profile-edit-popup__status");
let profileEditPopupForm = document.querySelector(".profile-edit-popup__form");


profileEditBtn.addEventListener("click", function () {
  profileEditPopup.classList.add("popup_opened");
  profileEditPopupName.value = profileName.textContent;
  profileEditPopupStatus.value = profileStatus.textContent;
})

profileEditPopupCloseBtn.addEventListener("click", function () {
  profileEditPopup.classList.remove("popup_opened");
})


function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = profileEditPopupName.value;
  profileStatus.textContent = profileEditPopupStatus.value;
  profileEditPopup.classList.remove("popup_opened");
}

profileEditPopupForm.addEventListener('submit', formSubmitHandler);
