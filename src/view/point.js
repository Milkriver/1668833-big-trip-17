import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointDatetimeDueDate, humanizePointDatetimeDueTime, humanizePointDueDate, humanizePointDueTime, timeDifferenceHours, timeDifferenceMinutes } from '../utils/common.js';
import { offersList } from '../mock/offer';

const createPointTemplate = (point) => {
  const { dateFrom, dateTo, destination, type, basePrice, isFavorite } = point;
  const date = humanizePointDueDate(dateFrom);
  const timeFrom = humanizePointDueTime(dateFrom);
  const timeTo = humanizePointDueTime(dateTo);
  const datetimeDate = humanizePointDatetimeDueDate(dateFrom);
  const datetimeTimeFrom = humanizePointDatetimeDueTime(dateFrom);
  const datetimeTimeTo = humanizePointDatetimeDueTime(dateTo);
  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';
  const offersListByType = offersList.find((offer) => ((offer.type === type))).offers;

  const renderEventOffer = (eventOffers) => eventOffers.map((eventOffer) =>
    `<li class="event__offer">
      <span class="event__offer-title">${eventOffer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${eventOffer.price}</span>
    </li>`
  ).join('');

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${datetimeDate}">${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime=${datetimeTimeFrom}>${timeFrom}</time>
            &mdash;
            <time class="event__end-time" datetime=${datetimeTimeTo}>${timeTo}</time>
          </p>
          <p class="event__duration">${timeDifferenceHours(dateTo, dateFrom)}H${timeDifferenceMinutes(dateTo, dateFrom)}M</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${renderEventOffer(offersListByType)}
        </ul>
        <button class="event__favorite-btn ${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class PointView extends AbstractView {
  #point = null;

  constructor(point) {
    super();

    this.#point = point;
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
