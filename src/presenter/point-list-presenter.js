import { render } from '../render.js';
import EditPointView from '../view/edit-point.js';
import PointView from '../view/point.js';
import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import NoPointScreenView from '../view/no-point-screen.js';

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
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });
    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#pointListComponent.element);
  };

  init = () => {
    render(new SortView(), this.#boardContainer);

    this.#pointList = [...this.#pointModel.points];
    if (this.#pointList.length < 1) {
      render(new NoPointScreenView, this.#boardContainer);
    } else {
      render(this.#pointListComponent, this.#boardContainer);
      for (let i = 0; i < 3; i++) {
        this.#renderPoint(this.#pointList[i]);
      }
    }
  };
}
