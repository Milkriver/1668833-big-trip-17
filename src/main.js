import { render } from './framework/render.js';
import FilterModel from './model/filter-model.js';
import PointModel from './model/point-model.js';
import PointListPresenter from './presenter/point-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewEventButtonView from './view/new-event-button.js';
import PointApiService from './point-api-service';
import OfferApiService from './offer-api-service.js';
import OfferModel from './model/offer-model.js';
import DestinationApiService from './destination-api-service.js';
import DestinationModel from './model/destination-model.js';

const AUTHORIZATION = 'Basic kS2sfS55wcl1sa3j';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

const siteTripMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteTripMainElement.querySelector('.trip-controls__filters');
const newPointButtonComponent = new NewEventButtonView();
const pointApiService = new PointApiService(END_POINT, AUTHORIZATION);
const offerApiService = new OfferApiService(END_POINT, AUTHORIZATION);
const destinationApiService = new DestinationApiService(END_POINT, AUTHORIZATION);

const tripEventsElement = document.querySelector('.trip-events');

const pointModel = new PointModel(pointApiService);
const filterModel = new FilterModel();
const offerModel = new OfferModel(offerApiService);
const destinationModel = new DestinationModel(destinationApiService);
const pointListPresenter = new PointListPresenter(tripEventsElement, pointModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointModel);

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  pointListPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

filterPresenter.init();
pointListPresenter.init();
pointModel.init()
  .finally(() => {
    render(newPointButtonComponent, siteTripMainElement);
    newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
  });

destinationModel.init();
offerModel.init();

