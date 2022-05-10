import PointModel from './model/point-model.js';
import PointListPresenter from './presenter/point-list-presenter.js';
import { render, RenderPosition } from './render.js';
import FilterView from './view/filter.js';
import TripInfoView from './view/trip-info.js';

const siteTripMainElement = document.querySelector('.trip-main');
render(new TripInfoView(), siteTripMainElement, RenderPosition.AFTERBEGIN);

const siteFilterElement = siteTripMainElement.querySelector('.trip-controls__filters');
render(new FilterView(), siteFilterElement);

const tripEventsElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const pointListPresenter = new PointListPresenter(tripEventsElement, pointModel);
pointListPresenter.init();
