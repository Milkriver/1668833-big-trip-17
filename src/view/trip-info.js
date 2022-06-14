import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointDueDate } from '../utils/common.js';
import { sortPointDay } from '../utils/point.js';

const pointDate = (points) => {
  const sortedPoints = points.sort(sortPointDay);
  return (
    `<p class="trip-info__dates">
      ${humanizePointDueDate(sortedPoints[0].dateFrom)}
      &nbsp;&mdash; &nbsp;
      ${humanizePointDueDate(sortedPoints[sortedPoints.length - 1].dateTo)}
    </p>`
  );
};

const totalPrice = (points, offers) => {
  let totalOffersPrice = 0;
  let totalPointsPrice = 0;
  for (let i = 0; i < points.length; i++) {
    const offersByType = offers.find((offer) => offer.type === points[i].type);
    let price = 0;
    for (let k = 0; k < points[i].offers.length; k++) {
      const checkedOffersByType = offersByType.offers.find((offer) => offer.id === points[i].offers[k]);
      price = price + checkedOffersByType.price;
    }
    totalOffersPrice += price;
  }
  points.forEach((point) => (totalPointsPrice = totalPointsPrice + point.basePrice));
  const total = totalOffersPrice + totalPointsPrice;
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;
      <span class="trip-info__cost-value">
        ${total}
      </span>
    </p>`
  );
};

const pointDestinationList = (points) => {
  const sortedPoints = points.sort(sortPointDay);
  const destinationList = sortedPoints.map((point) => point.destination.name);
  for (let index = 0; index < destinationList.length; index++) {
    if (destinationList[index] === destinationList[index + 1]) {
      destinationList.splice(index, 1);
    }
  }
  if (destinationList.length > 3) {
    return `<h1 class="trip-info__title"> ${destinationList[0]}  &mdash; ...  &mdash; ${destinationList[destinationList.length - 1]}</h1>`;
  }
  if (destinationList.length === 3) {
    return `<h1 class="trip-info__title"> ${destinationList[0]} &mdash; ${destinationList[1]} &mdash; ${destinationList[2]}</h1>`;
  }
  if (destinationList.length === 2) {
    return `<h1 class="trip-info__title"> ${destinationList[0]} &mdash; ${destinationList[1]}</h1>`;
  }
  if (destinationList.length === 1) {
    return `<h1 class="trip-info__title"> ${destinationList[0]}</h1>`;
  }
};

const createTripInfoTemplate = (points, offers) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      ${pointDestinationList(points)}
      ${pointDate(points)}
    </div>
    <p class="trip-info__cost">${totalPrice(points, offers)}</p>
  </section>`
);

export default class TripInfoView extends AbstractView {
  #points = null;
  #offers = null;

  constructor(points, offers) {
    super();
    this.#points = points;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#offers);
  }
}
