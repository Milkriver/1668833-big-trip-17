import { generatePoint } from '../mock/point.js';
import Observable from '../framework/observable.js';

export default class PointModel extends Observable{
  #points = Array.from({ length: 5 }, generatePoint);

  get points() {
    return this.#points;
  }
}
