import { render } from './framework/render.js';
import FilterModel from './model/filter-model.js';
import PointModel from './model/point-model.js';
import PointListPresenter from './presenter/point-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewEventButtonView from './view/new-event-button.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteTripMainElement.querySelector('.trip-controls__filters');
render(new NewEventButtonView(), siteTripMainElement);

const tripEventsElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const filterModel = new FilterModel();
const pointListPresenter = new PointListPresenter(tripEventsElement, pointModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointModel);
filterPresenter.init();
pointListPresenter.init();
