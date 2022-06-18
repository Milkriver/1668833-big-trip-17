import { remove, render, RenderPosition } from '../framework/render.js';
import EditPointView from '../view/edit-point';
import { UserAction, UpdateType, PointMode, Escape } from '../const.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #changeData = null;
  #pointEditComponent = null;
  #destroyCallback = null;
  #offersList = null;
  #destinationsList = null;
  #pointMode = PointMode.NEW;

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = (callback, offersList, destinationsList) => {
    this.#destroyCallback = callback;
    this.#offersList = offersList;
    this.#destinationsList = destinationsList;

    if (this.#pointEditComponent !== null) {
      return;
    }
    this.#pointEditComponent = new EditPointView(this.#offersList, this.#destinationsList, this.#pointMode);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  setSaving = () => {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#pointEditComponent.shake(resetFormState);
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === Escape.ESCAPE || evt.key === Escape.ESC) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
