export {Card};

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
    /*clone template*/
    const cardItem = document.querySelector(this._templateSelector).content.firstElementChild.cloneNode(true);
    const cardPhoto = cardItem.querySelector(this._selectorConfig.cardPhoto);
    const cardTitle = cardItem.querySelector(this._selectorConfig.cardTitle);
    /*get data from parameter object and pass it to elements properties  */
    cardPhoto.src = this._data.link;
    cardPhoto.alt = this._data.name;
    cardTitle.textContent = this._data.name;

    /*card delete*/
    const cardsDeleteBtn = cardItem.querySelector(this._selectorConfig.cardsDeleteBtn);
    cardsDeleteBtn.addEventListener("click", () => cardItem.remove())

    /*card like*/
    const cardLikeBtn = cardItem.querySelector(this._selectorConfig.cardLikeBtn);
    cardLikeBtn.addEventListener("click", () => {
      cardLikeBtn.classList.toggle(this._selectorConfig.cardsLikeClicked);
    })

    /*fullscreen photo by click on card's img*/
    cardPhoto.addEventListener("click", () => {
      this._handleCardClick(cardPhoto, cardTitle)
    })

    return cardItem;
  }
}




