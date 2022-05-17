import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import NoPointScreenView from '../view/no-point-screen.js';
import TripInfoView from '../view/trip-info.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils.js';

export default class PointListPresenter {
  #pointListContainer = null;
  #pointModel = null;
  #pointList = [];
  #pointListComponent = new PointListView();
  #sortComponent = new SortView();
  #tripInfoComponent = new TripInfoView();
  #noPointComponent = new NoPointScreenView;
  #pointPresenter = new Map();

  constructor(boardContainer, pointModel) {
    this.#pointListContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#pointList = [...this.#pointModel.points];
    this.#renderContent();
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointList = updateItem(this.#pointList, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderTripInfo = () => {
    const siteTripMainElement = document.querySelector('.trip-main');
    render(this.#tripInfoComponent, siteTripMainElement, RenderPosition.AFTERBEGIN);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderContent = () => {
    if (this.#pointList.length === 0) {
      render(this.#noPointComponent, this.#pointListContainer);
      return;
    }
    this.#renderTripInfo();
    render(this.#sortComponent, this.#pointListContainer);
    render(this.#pointListComponent, this.#pointListContainer);
    for (let i = 0; i < 3; i++) {
      this.#renderPoint(this.#pointList[i]);
    }
  };
}
