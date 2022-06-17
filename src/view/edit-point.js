import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeEditPointDatetimeDueTime } from '../utils/common.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { PointMode } from '../const.js';

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
  type: 'taxi',
};

const editPointTemplate = (data, offersList, destinationsList, pointMode) => {
  const { destination, type, dateFrom, dateTo, basePrice, offers, isDisabled, isSaving, isDeleting } = data;
  const offersType = offersList.map((offer) => offer.type);
  const offersListByType = offersList.find((offer) => ((offer.type === type))).offers;
  const checkedOffers = offersListByType.filter((offer) => offers.includes(offer.id));

  const renderRollupButton = (mode) => {
    if (mode === 'NEW') {
      return '';
    }
    return (
      `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`
    );
  };
  const renderCancelButton = (mode) => {
    const buttonName = (mode === 'NEW') ? 'Cancel' : 'Delete';
    const buttonProcessName = (mode === 'NEW') ? 'Canceling' : 'Deleting';
    return (
      `<button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
        ${isDeleting ? `${buttonProcessName}` : `${buttonName}`}
      </button>`);
  };

  const renderEventItem = (offerTypes) => offerTypes
    .map((offer) =>
      `<div class="event__type-item">
        <input id="event-type-${offer}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer}">
        <label class="event__type-label  event__type-label--${offer}" for="event-type-${offer}-1">${offer}</label>
      </div>`)
    .join('');

  const renderOfferItem = (offer) => {
    const isOfferChecked = checkedOffers.find((checkedOffer) => checkedOffer.id === offer.id);
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${(isOfferChecked) ? 'checked' : ''} >
        <label class="event__offer-label" for="${offer.id}">
          <span class="event__offer-title">${offer.title}</span>&plus;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
    );
  };

  const renderOffers = (offerItems) => {
    if (offerItems.length === 0) {
      return '';
    }

    const offerList = offerItems.map(renderOfferItem)
      .join('');

    return `
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offerList}
        </div>
      </section>
    `;
  };
  const renderDestinationPhoto = (destinationPhotos) => destinationPhotos.map((photo) => (
    `<img class="event__photo" src=${photo.src} alt="Event photo">`)
  ).join('');

  const renderDestinationDatalist = (destinationNames) => destinationNames.map((destinationName) => (
    `<option value=${destinationName.name}></option>`)
  ).join('');

  const renderDestination = (destinationItem) => {
    if (destinationItem.name === '') {
      return '';
    }
    return (
      `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description"> ${destinationItem.description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">${renderDestinationPhoto(destinationItem.pictures)}</div>
        </div>
      </section>`);
  };

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
                ${renderEventItem(offersType)}
              </fieldset >
            </div >
          </div >

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"
            list="destination-list-1" required ${isDisabled ? 'disabled' : ''} value=${he.encode(destination.name)} >
            <datalist id="destination-list-1">
              ${renderDestinationDatalist(destinationsList)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" ${isDisabled ? 'disabled' : ''}
            value="${humanizeEditPointDatetimeDueTime(dateFrom)}">&mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" ${isDisabled ? 'disabled' : ''}
            value="${humanizeEditPointDatetimeDueTime(dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1"><span class="visually-hidden">Price</span>&euro;</label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" min="1" name="event-price" value=${basePrice}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}> ${isSaving ? 'Saving...' : 'Save'}</button>
          ${renderCancelButton(pointMode)}
          ${renderRollupButton(pointMode)}
        </header>
        <section class="event__details">
          ${renderOffers(offersListByType)}
          ${renderDestination(destination)}
        </section>
      </form>
    </li > `
  );
};

export default class EditPointView extends AbstractStatefulView {
  #dateFromPicker = null;
  #dateToPicker = null;
  #offersList = null;
  #destinationsList = null;
  #pointMode = PointMode.EDIT;

  constructor(offersList, destinationsList, pointMode, point = BLANK_POINT) {
    super();
    this.#offersList = offersList;
    this.#destinationsList = destinationsList;
    this.#pointMode = pointMode;
    this._state = EditPointView.parsePointToState(point);
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setDeleteClickHandler();
  }

  get template() {
    return editPointTemplate(this._state, this.#offersList, this.#destinationsList, this.#pointMode);
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

  reset = (point) => {
    this.updateElement(
      EditPointView.parsePointToState(point),
    );
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
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeToggleHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationToggleHandler);
    if (this.element.querySelector('.event__available-offers') !== null) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersToggleHandler);
    }
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceToggleHandler);
  };

  #destinationToggleHandler = (evt) => {
    evt.preventDefault();
    const destinationInformation = this.#destinationsList.find((element) => (element.name === evt.target.value));
    if (destinationInformation === undefined) {
      this.element.querySelector('.event__input--destination').value = '';
      this.element.querySelector('.event__input--destination').placeholder = 'Выберите город из списка';
      return;
    }
    this.updateElement({
      destination: destinationInformation
    });

  };

  #typeToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #priceToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      basePrice: Number(evt.target.value),
    });
  };

  #offersToggleHandler = (evt) => {
    evt.preventDefault();
    const selectedOfferId = Number(evt.target.id);

    let updatedOffers;
    if (this._state.offers.find((element) => (element === selectedOfferId))) {
      updatedOffers = this._state.offers.filter((element) => element !== selectedOfferId);
    } else {
      updatedOffers = [...this._state.offers];
      updatedOffers.push(selectedOfferId);
    }

    this.updateElement({
      offers: updatedOffers,
    });
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EditPointView.parseStateToPoint(this._state));
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
    if (this.element.querySelector('.event__rollup-btn')) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    }
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  static parsePointToState = (point) => ({
    ...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });

  static parseStateToPoint = (state) => {
    const point = { ...state };
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    return point;
  };
}
