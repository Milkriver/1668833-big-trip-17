import { remove, render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import NoPointScreenView from '../view/no-point-screen.js';
import TripInfoView from '../view/trip-info.js';
import PointPresenter from './point-presenter.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { sortPointDay, sortPointDuration, sortPointPrice } from '../utils/point.js';
import { filter } from '../utils/filter.js';
import NewPointPresenter from './new-point-presenter.js';
import LoadingView from '../view/loading.js';

export default class PointListPresenter {
  #pointListContainer = null;
  #pointModel = null;
  #filterModel = null;

  #pointPresenter = new Map();
  #newPointPresenter = null;

  #pointListComponent = new PointListView();
  #tripInfoComponent = new TripInfoView();
  #loadingComponent = new LoadingView();
  #noPointComponent = null;
  #sortComponent = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  constructor(boardContainer, pointModel, filterModel) {
    this.#pointListContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter(this.#pointListComponent.element, this.#handleViewAction);
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY: return filteredPoints.sort(sortPointDay);
      case SortType.TIME: return filteredPoints.sort(sortPointDuration);
      case SortType.PRICE: return filteredPoints.sort(sortPointPrice);
    }
    return filteredPoints;
  }

  init = () => {
    this.#renderBoard();
  };

  createPoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(callback);
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT: this.#pointModel.updatePoint(updateType, update); break;
      case UserAction.ADD_POINT: this.#pointModel.addPoint(updateType, update); break;
      case UserAction.DELETE_POINT: this.#pointModel.deletePoint(updateType, update); break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH: this.#pointPresenter.get(data.id).init(data); break;
      case UpdateType.MINOR: this.#clearBoard(); this.#renderBoard(); break;
      case UpdateType.MAJOR: this.#clearBoard({ resetSortType: true }); this.#renderBoard(); break;
      case UpdateType.INIT: this.#isLoading = false; remove(this.#loadingComponent); this.#renderBoard(); break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) { return; }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#pointListContainer);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderList = (list) => {
    for (let i = 0; i < list.length; i++) {
      this.#renderPoint(list[i]);
    }
  };

  #renderPointList = (sortedPoints) => {
    render(this.#pointListComponent, this.#pointListContainer);
    this.#renderList(sortedPoints);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#pointListComponent.element, RenderPosition.AFTERBEGIN);
  };

  #clearBoard = ({ resetSortType = false } = {}) => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noPointComponent) { remove(this.#noPointComponent); }
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderTripInfo = () => {
    const siteTripMainElement = document.querySelector('.trip-main');
    render(this.#tripInfoComponent, siteTripMainElement, RenderPosition.AFTERBEGIN);
  };

  #renderBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#noPointComponent = new NoPointScreenView(this.#filterType);
      render(this.#noPointComponent, this.#pointListContainer);
      return;
    }

    this.#renderTripInfo();
    this.#renderSort();
    this.#renderPointList(points);
  };

}
