import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import NoPointScreenView from '../view/no-point-screen.js';
import TripInfoView from '../view/trip-info.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortPointDay, sortPointDuration, sortPointPrice } from '../utils/point.js';

export default class PointListPresenter {
  #pointListContainer = null;
  #pointModel = null;
  #pointList = [];
  #pointListComponent = new PointListView();
  #sortComponent = new SortView();
  #tripInfoComponent = new TripInfoView();
  #noPointComponent = new NoPointScreenView;
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;
  #sourcedPoints = [];

  constructor(boardContainer, pointModel) {
    this.#pointListContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#pointList = [...this.#pointModel.points];
    this.#sourcedPoints = [...this.#pointModel.points];
    this.#renderContent();
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointList = updateItem(this.#pointList, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortTasks = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#pointList.sort(sortPointDay);
        break;
      case SortType.TIME:
        this.#pointList.sort(sortPointDuration);
        break;
      case SortType.PRICE:
        this.#pointList.sort(sortPointPrice);
        break;
      default:
        this.#pointList = [...this.#sourcedPoints];
    }

    this.#currentSortType = sortType;
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderTripInfo = () => {
    const siteTripMainElement = document.querySelector('.trip-main');
    render(this.#tripInfoComponent, siteTripMainElement, RenderPosition.AFTERBEGIN);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortTasks(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#pointListContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderPointList = () => {
    render(this.#pointListComponent, this.#pointListContainer);
    for (let i = 0; i < 3; i++) {
      this.#renderPoint(this.#pointList[i]);
    }
  };

  #renderContent = () => {
    if (this.#pointList.length === 0) {
      render(this.#noPointComponent, this.#pointListContainer);
      return;
    }
    this.#renderTripInfo();
    this.#renderSort();
    this.#renderPointList();
  };
}
