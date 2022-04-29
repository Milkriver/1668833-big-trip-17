import { getRandomInteger } from '../utils';

const generatePointType = () => {
  const pointType = [
    'taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'
  ];
  const randomIndex = getRandomInteger(0, pointType.length - 1);
  return pointType[randomIndex];
};

const generatePointDestination = () => {
  const pointDestination = [
    'London', 'Moscow', 'Amsterdam', 'Tokio', 'Paris', 'Ekaterinburg', 'Ottawa', 'Toronto', 'Lissabon'
  ];
  const randomIndex = getRandomInteger(0, pointDestination.length - 1);
  return pointDestination[randomIndex];
};

export const generateType = () => (
  {
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: generatePointDestination(),
    id: '0',
    isFavorite: false,
    offers: '',
    type: generatePointType(),
  }

);

