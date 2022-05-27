import { nanoid } from 'nanoid';
import { generateRandomMock, getRandomInteger } from '../utils/common.js';
import { generateDestination } from './destination.js';

const pointType = [
  'taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'
];

const generateDate = (from, to) => {
  const dateFrom = Date.parse(from);
  const dateTo = Date.parse(to);

  return new Date(Math.floor(Math.random() * (dateTo - dateFrom + 1) + dateFrom));
};

export const generatePoint = () => (
  {
    basePrice: getRandomInteger(10, 1000),
    dateFrom: generateDate('2021-01-01', '2021-01-15'),
    dateTo: generateDate('2021-01-16', '2021-01-30'),
    destination: generateDestination(),
    id: nanoid(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: [1, 2, 3],
    type: generateRandomMock(pointType),
  });
