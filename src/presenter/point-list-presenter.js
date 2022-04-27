
import { render } from '../render.js';
import EditPointView from '../view/edit-point.js';
import PointView from '../view/point.js';

export default class PointListPresenter {
  init = (boardContainer) => {
    this.boardContainer = boardContainer;
    render(new EditPointView(), this.boardContainer);
    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.boardContainer);
    }
  };
}
