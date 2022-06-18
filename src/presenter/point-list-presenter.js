import { remove, render, RenderPosition } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import NoPointScreenView from '../view/no-point-screen-view.js';
import TripInfoView from '../view/trip-info-view.js';
import PointPresenter from './point-presenter.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { sortPointDay, sortPointDuration, sortPointPrice } from '../utils/point.js';
import { filter } from '../utils/filter.js';
import NewPointPresenter from './new-point-presenter.js';
import LoadingView from '../view/loading-view.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const totalPrice = (points, offers) => {
  let totalOffersPrice = 0;
  let totalPointsPrice = 0;
  for (let i = 0; i < points.length; i++) {
    const offersByType = offers.find((offer) => offer.type === points[i].type);
    let price = 0;
    for (let j = 0; j < points[i].offers.length; j++) {
      const checkedOffersByType = offersByType.offers.find((offer) => offer.id === points[i].offers[j]);
      price += checkedOffersByType.price;
    }
    totalOffersPrice += price;
  }
  points.forEach((point) => (totalPointsPrice += point.basePrice));
  const total = totalOffersPrice + totalPointsPrice;
  return total;
};
export default class PointListPresenter {
  #pointListContainer = null;
  #siteTripMainElement = null;
  #pointModel = null;
  #filterModel = null;

  #pointPresenter = new Map();
  #newPointPresenter = null;

  #pointListComponent = new PointListView();
  #loadingComponent = new LoadingView();
  #noPointComponent = null;
  #sortComponent = null;
  #tripInformationComponent = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(boardContainer, pointModel, filterModel, siteTripMainElement) {
    this.#pointListContainer = boardContainer;
    this.#siteTripMainElement = siteTripMainElement;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter(this.#pointListComponent.element, this.#handleViewAction);

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointDay);
      case SortType.TIME:
        return filteredPoints.sort(sortPointDuration);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPrice);
    }

    return filteredPoints;
  }

  get offers() {
    return this.#pointModel.offers;
  }

  get destinations() {
    return this.#pointModel.destinations;
  }

  init = () => {
    this.#renderBoard();
  };

  createPoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(callback, this.offers, this.destinations);
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;

      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointModel.addPoint(updateType, update);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;

      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;

      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;

      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;

      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#pointListContainer);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, this.offers, this.destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderList = (list) => list.forEach(this.#renderPoint);

  #renderPointList = (sortedPoints) => {
    render(this.#pointListComponent, this.#pointListContainer);
    this.#renderList(sortedPoints);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#pointListComponent.element, RenderPosition.AFTERBEGIN);
  };

  #clearBoard = ({ resetSortType = false } = {}) => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    remove(this.#tripInformationComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderTripInfo = () => {
    const total = totalPrice(this.points, this.offers);
    this.#tripInformationComponent = new TripInfoView(this.points, total);
    render(this.#tripInformationComponent, this.#siteTripMainElement, RenderPosition.AFTERBEGIN);
  };

  #renderBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#noPointComponent = new NoPointScreenView(this.#filterType);
      render(this.#noPointComponent, this.#pointListContainer);
      return;
    }
    this.#renderTripInfo();
    this.#renderSort();
    this.#renderPointList(points);
  };
}
