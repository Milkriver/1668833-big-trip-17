import PointsListPresenter from './presenter/points-list-presenter.js';
import {render, RenderPosition} from './render.js';
import FiltersView from './view/filters.js';
import PointsListView from './view/points-list.js';
import SortView from './view/sort.js';
import TripInfoView from './view/trip-info.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const siteSortElement = document.querySelector('.trip-events');
const pointsListPresenter = new PointsListPresenter();
render(new TripInfoView(), siteTripMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), siteFiltersElement, RenderPosition.BEFOREEND);
render(new SortView(), siteSortElement);
render(new PointsListView(), siteSortElement);
const siteTripEventsListElement = document.querySelector('.trip-events__list');
pointsListPresenter.init(siteTripEventsListElement);

