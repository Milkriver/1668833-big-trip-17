import { SortTypes } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const renderSortType = (sortTypesRename) => sortTypesRename.map((sortType) =>
  `<div class="trip-sort__item  trip-sort__item--${sortType.type}" >
    <input id="sort-${sortType.type}" class="trip-sort__input  visually-hidden" data-sort-type="${sortType.sortType}" type="radio" name="trip-sort" value="sort-${sortType.type}" ${sortType.additional}>
    <label class="trip-sort__btn" for="sort-${sortType.type}" >${sortType.title}</label>
  </div>`
).join('');

const createSortTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${renderSortType(SortTypes)}
  </form>`
);

export default class SortView extends AbstractView {
  get template() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
