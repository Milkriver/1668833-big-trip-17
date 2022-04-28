import PointListPresenter from './presenter/point-list-presenter.js';
import {render, RenderPosition} from './render.js';
import FilterView from './view/filter.js';
import PointListView from './view/point-list.js';
import SortView from './view/sort.js';
import TripInfoView from './view/trip-info.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteSortElement = document.querySelector('.trip-events');
const pointListPresenter = new PointListPresenter();
const siteTripEventsListElement = document.querySelector('.trip-events__list');

render(new TripInfoView(), siteTripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), siteFilterElement, RenderPosition.BEFOREEND);
render(new SortView(), siteSortElement);
render(new PointListView(), siteSortElement);

pointListPresenter.init(siteTripEventsListElement);
