import { createElement } from '../render.js';

const createNoPointsScreenTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class NoPointScreenView {
  #element = null;

  get template() {
    return createNoPointsScreenTemplate();
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
