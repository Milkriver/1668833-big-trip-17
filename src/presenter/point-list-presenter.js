import { render } from '../render.js';
import EditPointView from '../view/edit-point.js';
import PointView from '../view/point.js';

export default class PointListPresenter {
  #boardContainer = null;
  #pointModel = null;
  #pointList = [];

  init = (boardContainer, pointModel) => {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#pointList = [...this.#pointModel.points];

    render(new EditPointView(this.#pointList[0]), this.#boardContainer);

    for (let i = 0; i < 3; i++) {
      render(new PointView(this.#pointList[i]), this.#boardContainer);
    }
  };
}
