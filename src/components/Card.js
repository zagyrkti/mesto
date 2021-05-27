
class Card {
  constructor(itemData, templateSelector, handleCardClick, handleLike, handleRemoveLike, id, handleDelete) {
    this._data = itemData;
    this._id = id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleDelete = handleDelete;
    this._selectorConfig = {
      cardPhoto: ".cards__photo",
      cardTitle: ".cards__title",
      cardsDeleteBtn: ".cards__delete",
      cardLikeBtn: ".cards__like",
      cardsLikeClicked: "cards__like_clicked",
      cardLikeNumber: ".cards__like-number"
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
    this.cardLikeNumber = this._cardItem.querySelector(this._selectorConfig.cardLikeNumber);
  }

  _fillCard() {
    /*get data from parameter object and pass it to elements properties  */
    this._cardPhoto.src = this._data.link;
    this._cardPhoto.alt = this._data.name;
    this._cardTitle.textContent = this._data.name;
    /*TODO try includes*/
    /*display likes*/
    this._data.likes.forEach((like) => {
      if(like._id === this._id) {
        this._cardLikeBtn.classList.add(this._selectorConfig.cardsLikeClicked)
      }
    })
    /*hide delete if not owner*/
    if(this._data.owner._id !== this._id) {
      this._cardsDeleteBtn.remove()
    }
    this.cardLikeNumber.textContent = this._data.likes.length
  }

  _setEventListeners() {
    /*fullscreen photo by click on card's __img*/
    this._cardPhoto.addEventListener("click", () => {
      this._handleCardClick(this._cardPhoto, this._cardTitle)
    })
    /*delete Card*/
    this._cardsDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._data._id, this._cardItem);
    })
    /*like*/
    this._cardLikeBtn.addEventListener("click", () => {
      if(this._cardLikeBtn.classList.contains(this._selectorConfig.cardsLikeClicked)) {
        this._cardLikeBtn.classList.remove(this._selectorConfig.cardsLikeClicked);
        this._handleRemoveLike(this._data._id);
      } else {
        /*функционал некритичный если сразу добавлять\снимать отзывчивость лучше а то без того все тормозное*/
        this._cardLikeBtn.classList.add(this._selectorConfig.cardsLikeClicked);
        this._handleCardLike(this._data._id);
      }
    })
  }
}

export {Card};



