import { offerType } from '../mock/offer.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeEditPointDatetimeDueTime } from '../utils/common.js';

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: '',
  id: 0,
  isFavorite: false,
  offers: {
    type: '',
    offers: [
      {
        id: 0,
        title: '',
        price: 0
      }
    ]
  },
  type: '',
};

const editPointTemplate = (point) => {
  const { destination, offers, dateFrom, dateTo, basePrice } = point;
  const renderEventItem = (offerTypes) => offerTypes.map((offer) =>
    `<div class="event__type-item">
      <input id="event-type-${offer}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer}">
      <label class="event__type-label  event__type-label--${offer}" for="event-type-${offer}-1">${offer}</label>
    </div>`
  ).join('');
  const renderOfferItem = (offerItems) => offerItems.map((offer) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}">
      <label class="event__offer-label" for="event-offer-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  ).join('');

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1"><span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${renderEventItem(offerType)}
              </fieldset >
            </div >
          </div >

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${offers.type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination.name} list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeEditPointDatetimeDueTime(dateFrom)}">&mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeEditPointDatetimeDueTime(dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1"><span class="visually-hidden">Price</span>&euro;</label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${renderOfferItem(offers.offers)}
            </div>
          </section>
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description"> ${destination.description}</p>
          </section>
        </section>
      </form>
    </li > `
  );
};

export default class EditPointView extends AbstractStatefulView {
  #point = null;

  constructor(point = BLANK_POINT) {
    super();

    this._state = EditPointView.parsePointToState(point);
    this.#setInnerHandlers();
  }

  get template() {
    return editPointTemplate(this._state);
  }


  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  };

  #setInnerHandlers = () => {

  };


  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditPointView.parseStateToPoint(this._state));
  };

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  static parsePointToState = (point) => ({
    ...point,
    destination: point.destination,
    offers: point.offers,
  });

  static parseStateToPoint = (state) => {
    const point = { ...state };
    return point;
  };
}
