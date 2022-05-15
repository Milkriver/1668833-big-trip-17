import { render } from './framework/render.js';
import PointModel from './model/point-model.js';
import PointListPresenter from './presenter/point-list-presenter.js';
import FilterView from './view/filter.js';
import NewEventButtonView from './view/new-event-button.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteTripMainElement.querySelector('.trip-controls__filters');
render(new FilterView(), siteFilterElement);
render(new NewEventButtonView(), siteTripMainElement);

const tripEventsElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const pointListPresenter = new PointListPresenter(tripEventsElement, pointModel);
pointListPresenter.init();
