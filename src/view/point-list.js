import { createElement } from '../render.js';

const createPointsListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class PointListView {
  #element = null;

  get template() {
    return createPointsListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
