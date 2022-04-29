import { generateType } from '../mock/point.js';

export default class PointModel {
  points = Array.from({length: 3}, generateType);

  getPoints = () => this.points;
}
