export class Section {
  constructor(renderer, containerSelector) {
    /*this._itemsData = itemsData;*/
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(data) {
    this._renderer(data);
  }

  addItems(element) {
    this._container.prepend(element)
  }
}