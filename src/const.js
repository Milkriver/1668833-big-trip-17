import { offerType } from './mock/offer';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: {
    name: '',
    description: '',
    pictures: []
  },
  id: 0,
  isFavorite: false,
  offers: [],
  type: offerType[0],
};
const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const SortTypes = [
  {
    type: 'day',
    title: 'Day',
    sortType: SortType.DAY,
  },
  {
    type: 'event',
    title: 'Event',
    sortType: SortType.EVENT,
    additional: 'disabled',
  },
  {
    type: 'time',
    title: 'Time',
    sortType: SortType.TIME
  },
  {
    type: 'price',
    title: 'Price',
    sortType: SortType.PRICE
  },
  {
    type: 'offer',
    title: 'Offer',
    sortType: SortType.OFFER,
    additional: 'disabled',
  }
];

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export { FilterType, SortTypes, SortType, UserAction, UpdateType, BLANK_POINT };
