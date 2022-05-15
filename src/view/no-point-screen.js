import AbstractView from '../framework/view/abstract-view.js';

const createNoPointsScreenTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class NoPointScreenView extends AbstractView{
  get template() {
    return createNoPointsScreenTemplate();
  }
}
