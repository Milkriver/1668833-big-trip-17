import { generateRandomMock, getRandomInteger } from '../utils';

export const offerType = [
  'taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'
];
const offerTitle = [
  'Upgrade to a business class',
  'Choose the radio station',
  'Add luggage',
  'Switch to comfort',
  'Add meal'
];

export const generateOffer = () => (
  {
    type: generateRandomMock(offerType),
    offers: [
      {
        id: 1,
        title: generateRandomMock(offerTitle),
        price: getRandomInteger(10, 100)
      },
      {
        id: 2,
        title: generateRandomMock(offerTitle),
        price: getRandomInteger(10, 100)
      },
      {
        id: 3,
        title: generateRandomMock(offerTitle),
        price: getRandomInteger(10, 100)
      }
    ]
  }
);

