export {Card};

class Card {
  constructor(itemData, templateSelector, handleCardClick) {
    this.data = itemData;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
    this.selectorConfig = {
      cardPhoto: ".cards__photo",
      cardTitle: ".cards__title",
      cardsDeleteBtn: ".cards__delete",
      cardLikeBtn: ".cards__like",
      cardsLikeClicked: "cards__like_clicked",
    }
  }

  createCard() {
    /*clone template*/
    const cardItem = document.querySelector(this.templateSelector).content.firstElementChild.cloneNode(true);
    const cardPhoto = cardItem.querySelector(this.selectorConfig.cardPhoto);
    const cardTitle = cardItem.querySelector(this.selectorConfig.cardTitle);
    /*get data from parameter object and pass it to elements properties  */
    cardPhoto.src = this.data.link;
    cardPhoto.alt = this.data.name;
    cardTitle.textContent = this.data.name;

    /*card delete*/
    const cardsDeleteBtn = cardItem.querySelector(this.selectorConfig.cardsDeleteBtn);
    cardsDeleteBtn.addEventListener("click", () => cardItem.remove())

    /*card like*/
    const cardLikeBtn = cardItem.querySelector(this.selectorConfig.cardLikeBtn);
    cardLikeBtn.addEventListener("click", () => {
      cardLikeBtn.classList.toggle(this.selectorConfig.cardsLikeClicked);
    })

    /*fullscreen photo by click on card's img*/
    cardPhoto.addEventListener("click", () => {
      this.handleCardClick(cardPhoto, cardTitle)
    })

    return cardItem;
  }
}




