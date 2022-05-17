import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import NoPointScreenView from '../view/no-point-screen.js';
import TripInfoView from '../view/trip-info.js';
import PointPresenter from './point-presenter.js';

export default class PointListPresenter {
  #pointListContainer = null;
  #pointModel = null;
  #pointList = [];
  #pointListComponent = new PointListView();
  #sortComponent = new SortView();
  #tripInfoComponent = new TripInfoView();
  #noPointComponent = new NoPointScreenView;

  constructor(boardContainer, pointModel) {
    this.#pointListContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#pointList = [...this.#pointModel.points];
    this.#renderContent();
  };

  #renderTripInfo = () => {
    const siteTripMainElement = document.querySelector('.trip-main');
    render(this.#tripInfoComponent, siteTripMainElement, RenderPosition.AFTERBEGIN);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element);
    pointPresenter.init(point);
  };

  #renderContent = () => {
    if (this.#pointList.length === 0) {
      render(new NoPointScreenView, this.#pointListContainer);
      return;
    }
    this.#renderTripInfo();
    render(new SortView(), this.#pointListContainer);
    render(this.#pointListComponent, this.#pointListContainer);
    for (let i = 0; i < 3; i++) {
      this.#renderPoint(this.#pointList[i]);
    }
  };
}
