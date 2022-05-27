import { offerType } from '../mock/offer.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeEditPointDatetimeDueTime } from '../utils/common.js';
import { offersList } from '../mock/offer';
import { destinationsList } from '../mock/destination';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: {
    name: '',
    description: '',
    pictures: []
  },
  id: 0,
  isFavorite: false,
  offers: [],
  type: offerType[0],
};
const editPointTemplate = (point) => {
  const { destination, type, dateFrom, dateTo, basePrice } = point;
  const offersListByType = offersList.find((offer) => ((offer.type === type))).offers;


  const renderEventItem = (offerTypes) => offerTypes.map((offer) =>
    `<div class="event__type-item">
      <input id="event-type-${offer}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer}">
      <label class="event__type-label  event__type-label--${offer}" for="event-type-${offer}-1">${offer}</label>
    </div>`
  ).join('');
  const renderOfferItem = (offerItems) => offerItems.map((offer) => (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}">
      <label class="event__offer-label" for="event-offer-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`)
  ).join('');
  const renderDestinationPhoto = (destinationPhotos) => (destinationPhotos) ? destinationPhotos.map((photo) => (
    `<img class="event__photo" src=${photo.src} alt="Event photo">`)
  ).join('') : '';
  const renderDestinationDatalist = (destinationNames) => destinationNames.map((destinationName) => (
    `<option value=${destinationName.name}></option>`)
  ).join('');

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1"><span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
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
            ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination.name} list="destination-list-1">
            <datalist id="destination-list-1">
              ${renderDestinationDatalist(destinationsList)}
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
              ${renderOfferItem(offersListByType)}
            </div>
          </section>
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description"> ${destination.description}</p>
            <div class="event__photos-container">
            <div class="event__photos-tape">
            ${renderDestinationPhoto(destination.pictures)}
            </div>
          </div>
          </section>
        </section>
      </form>
    </li > `
  );
};

export default class EditPointView extends AbstractStatefulView {
  #dateFromPicker = null;
  #dateToPicker = null;

  constructor(point = BLANK_POINT) {
    super();

    this._state = point;
    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  get template() {
    return editPointTemplate(this._state);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }

    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepicker = () => {
    this.#dateFromPicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );
    this.#dateToPicker = flatpickr(this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler,
      });
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeToggleHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationToggleHandler);
  };

  #destinationToggleHandler = (evt) => {
    evt.preventDefault();
    const destinationInformation = destinationsList.find((element) => ((element.name === evt.target.value)));
    this.updateElement({
      destination: destinationInformation
    }
    );
  };

  #typeToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
    });
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(this._state);
  };

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };
}
