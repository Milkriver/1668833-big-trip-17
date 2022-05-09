import { generateRandomMock, getRandomInteger } from '../utils';
import { generateOffer } from './offer';

const pointType = [
  'taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'
];
const pointDestination = [
  'London', 'Moscow', 'Amsterdam', 'Tokio', 'Paris', 'Ekaterinburg', 'Ottawa', 'Toronto', 'Lissabon'
];

const generateDestination = () => (
  {
    description: `${generateRandomMock(pointDestination)}, is a beautiful city, a true asian pearl, with crowded streets.`,
    name: `${generateRandomMock(pointDestination)}`,
    pictures: [
      {
        'src': 'http://picsum.photos/300/200?r=0.0762563005163317',
        'description': `${generateRandomMock(pointDestination)} parliament building`
      }
    ]
  }
);

export const generatePoint = () => (
  {
    basePrice: getRandomInteger(10, 1000),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: generateDestination(),
    id: '0',
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: generateOffer(),
    type: generateRandomMock(pointType),
  }
);
