import he from 'he';
import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointDatetimeDueDate, humanizePointDatetimeDueTime, humanizePointDueDate, humanizePointDueTime, timeDifferenceDays, timeDifferenceHours, timeDifferenceMinutes } from '../utils/common.js';

const createPointTemplate = (point, offersList) => {
  const { dateFrom, dateTo, destination, type, basePrice, isFavorite, offers } = point;
  const date = humanizePointDueDate(dateFrom);
  const timeFrom = humanizePointDueTime(dateFrom);
  const timeTo = humanizePointDueTime(dateTo);
  const datetimeDate = humanizePointDatetimeDueDate(dateFrom);
  const datetimeTimeFrom = humanizePointDatetimeDueTime(dateFrom);
  const datetimeTimeTo = humanizePointDatetimeDueTime(dateTo);
  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';
  const offersListByType = offersList.find((offer) => ((offer.type === type))).offers;
  const checkedOffers = offersListByType.filter((offer) => {
    for (let index = 0; index < offers.length; index++) {
      if (offer.id === offers[index]) { return offer; }
    }
  });
  const renderEventOffer = (eventOffers) => eventOffers.map((eventOffer) =>
    `<li class="event__offer">
      <span class="event__offer-title">
        ${eventOffer.title}
      </span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">
        ${eventOffer.price}
      </span>
    </li>`
  ).join('');

  const renderDuration = (start, end) => {
    const daysDuration = timeDifferenceDays(start, end);
    const hoursDuration = timeDifferenceHours(start, end);
    const minutesDuration = timeDifferenceMinutes(start, end);
    const renderCorrectDuration = (duration, letter) => {
      if (duration <= 0) { return ''; }
      else if (duration >= 10) { return `${duration}${letter}`; }
      else if (0 < duration < 10) { return `0${duration}${letter}`; }
    };
    return (`<p class="event__duration">
      ${renderCorrectDuration(daysDuration, 'D')}
      ${renderCorrectDuration(hoursDuration, 'H')}
      ${renderCorrectDuration(minutesDuration, 'M')}
    </p > `);
  };

  return (
    `<li class="trip-events__item" >
      <div class="event">
        <time class="event__date" datetime="${datetimeDate}">${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">
          ${type} ${he.encode(destination.name)}
        </h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime=${datetimeTimeFrom}>${timeFrom}</time>
            &mdash;
            <time class="event__end-time" datetime=${datetimeTimeTo}>${timeTo}</time>
          </p>
          ${renderDuration(dateTo, dateFrom)}
        </div>
        <p class="event__price">
          &euro;&nbsp;
          <span class="event__price-value">
            ${basePrice}
          </span>
        </p>
        <h4 class="visually-hidden">
          Offers:
        </h4>
        <ul class="event__selected-offers">
          ${renderEventOffer(checkedOffers)}
        </ul>
        <button class="event__favorite-btn ${favoriteClassName}" type="button">
          <span class="visually-hidden">
            Add to favorite
          </span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">
            Open event
          </span>
        </button>
      </div>
    </li > `
  );
};

export default class PointView extends AbstractView {
  #point = null;
  #offersList = null;

  constructor(point, offersList) {
    super();

    this.#point = point;
    this.#offersList = offersList;
  }

  get template() {
    return createPointTemplate(this.#point, this.#offersList);
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
