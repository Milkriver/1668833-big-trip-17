import { render } from '../render.js';
import EditPointView from '../view/edit-point.js';
import PointView from '../view/point.js';
import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';

export default class PointListPresenter {
  #boardContainer = null;
  #pointModel = null;
  #pointList = [];
  #pointListComponent = new PointListView();

  constructor(boardContainer, pointModel) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  #renderPoint = (point) => {
    const pointComponent = new PointView(point);
    const pointEditComponent = new EditPointView(point);

    const replacePointToForm = () => {
      this.#pointListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#pointListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
    });


    render(pointComponent, this.#pointListComponent.element);
  };

  #renderBoard = () => {
    render(new SortView(), this.#boardContainer);
    render(this.#pointListComponent, this.#boardContainer);
  };

  init = () => {
    this.#pointList = [...this.#pointModel.points];

    for (let i = 0; i < 3; i++) {
      this.#renderPoint(this.#pointList[i]);
    }
    this.#renderBoard();
  };
}
