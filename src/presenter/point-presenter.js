import { render, replace } from '../framework/render';
import EditPointView from '../view/edit-point';
import PointView from '../view/point';

export default class PointPresenter {
  #point = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #pointListContainer = null;

  constructor(pointListContainer) {
    this.#pointListContainer = pointListContainer;
  }

  init = (point) => {
    this.#point = point;

    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new EditPointView(point);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointEditComponent.setEditClickHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);

    render(this.#pointComponent, this.#pointListContainer);
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #onEscKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };
}
