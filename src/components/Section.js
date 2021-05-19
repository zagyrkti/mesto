export class Section {
  constructor({itemsData, renderer}, containerSelector) {
    this._itemsData = itemsData;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderer(this._itemsData);
  }

  addItems(element) {
    this._container.prepend(element)
  }
}