import { render, RenderPosition } from '../framework/render.js';
import EditPointView from '../view/edit-point.js';
import PointView from '../view/point.js';
import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import NoPointScreenView from '../view/no-point-screen.js';
import TripInfoView from '../view/trip-info.js';

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
    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setEditClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });
    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#pointListComponent.element);
  };

  #renderContent = () => {
    const siteTripMainElement = document.querySelector('.trip-main');
    render(new TripInfoView(), siteTripMainElement, RenderPosition.AFTERBEGIN);
    render(new SortView(), this.#boardContainer);
    render(this.#pointListComponent, this.#boardContainer);
    for (let i = 0; i < 3; i++) {
      this.#renderPoint(this.#pointList[i]);
    }
  };

  init = () => {
    this.#pointList = [...this.#pointModel.points];
    if (this.#pointList.length === 0) {
      return render(new NoPointScreenView, this.#boardContainer);
    }
    this.#renderContent();
  };
}
