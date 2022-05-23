import { nanoid } from 'nanoid';
import { generateRandomMock, getRandomInteger } from '../utils/common.js';
import { generateOffer } from './offer';

const pointType = [
  'taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'
];
const pointDestination = [
  'London', 'Moscow', 'Amsterdam', 'Tokio', 'Paris', 'Ekaterinburg', 'Ottawa', 'Toronto', 'Lissabon'
];

const generateDestination = () => {
  const destination = generateRandomMock(pointDestination);
  return {
    description: `${destination}, is a beautiful city, a true asian pearl, with crowded streets.`,
    name: `${destination}`,
    pictures: [
      {
        'src': 'http://picsum.photos/300/200?r=0.0762563005163317',
        'description': `${destination} parliament building`
      }
    ]
  };
};

const generateDate = (from, to) => {
  const dateFrom = Date.parse(from);
  const dateTo = Date.parse(to);

  return new Date(Math.floor(Math.random() * (dateTo - dateFrom + 1) + dateFrom));
};

export const generatePoint = () => {
  const type = generateRandomMock(pointType);
  return {
    basePrice: getRandomInteger(10, 1000),
    dateFrom: generateDate('2021-01-01', '2021-01-15'),
    dateTo: generateDate('2021-01-16', '2021-01-30'),
    destination: generateDestination(),
    id: nanoid(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: generateOffer(type),
    type: type,
  };
};
