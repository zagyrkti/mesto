
class Card {
  constructor(itemData, templateSelector, handleCardClick) {
    this._data = itemData;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._selectorConfig = {
      cardPhoto: ".cards__photo",
      cardTitle: ".cards__title",
      cardsDeleteBtn: ".cards__delete",
      cardLikeBtn: ".cards__like",
      cardsLikeClicked: "cards__like_clicked",
    }
  }

  createCard() {
    this._getElements()
    this._fillCard();
    this._setEventListeners();
    return this._cardItem;
  }

  _getElements() {
    this._cardItem = document.querySelector(this._templateSelector).content.firstElementChild.cloneNode(true);
    this._cardPhoto = this._cardItem.querySelector(this._selectorConfig.cardPhoto);
    this._cardTitle = this._cardItem.querySelector(this._selectorConfig.cardTitle);
    this._cardsDeleteBtn = this._cardItem.querySelector(this._selectorConfig.cardsDeleteBtn);
    this._cardLikeBtn = this._cardItem.querySelector(this._selectorConfig.cardLikeBtn);
  }

  _fillCard() {
    /*get data from parameter object and pass it to elements properties  */
    this._cardPhoto.src = this._data.link;
    this._cardPhoto.alt = this._data.name;
    this._cardTitle.textContent = this._data.name;
  }

  _setEventListeners() {
    /*fullscreen photo by click on card's img*/
    this._cardPhoto.addEventListener("click", () => {
      this._handleCardClick(this._cardPhoto, this._cardTitle)
    })
    /*delete Card*/
    this._cardsDeleteBtn.addEventListener("click", () => {
      this._cardItem.remove()
      this._cardItem = null;
    })
    /*like*/
    this._cardLikeBtn.addEventListener("click", () => {
      this._cardLikeBtn.classList.toggle(this._selectorConfig.cardsLikeClicked);
    })
  }
}

export {Card};



