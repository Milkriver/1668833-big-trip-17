import { FilterType } from '../const';
import { isPointInFuture, isPointInPast } from './point.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointInFuture(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointInPast(point.dateTo)),
};

export { filter };
