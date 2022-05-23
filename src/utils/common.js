import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizePointDueDate = (dueDate) => dayjs(dueDate).format('MMM D');
const humanizePointDueTime = (dueTime) => dayjs(dueTime).format('HH:mm');
const humanizePointDatetimeDueDate = (dueDate) => dayjs(dueDate).format('YYYY-MM-DD');
const humanizePointDatetimeDueTime = (dueTime) => dayjs(dueTime).format('YYYY-MM-DDTHH:mm');
const humanizeEditPointDatetimeDueTime = (dueTime) => dayjs(dueTime).format('DD/MM/YY HH:mm');
const timeDifferenceHours = (dateTo, dateFrom) => Math.floor(dayjs(dateTo).diff(dayjs(dateFrom), 'minute') / 60);
const timeDifferenceMinutes = (dateTo, dateFrom) => dayjs(dateTo).diff(dayjs(dateFrom), 'minute') % 60;

const generateRandomMock = (mocks) => {
  const randomIndex = getRandomInteger(0, mocks.length - 1);
  return mocks[randomIndex];
};
const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
export { getRandomInteger, updateItem, humanizePointDueDate, humanizePointDueTime, humanizeEditPointDatetimeDueTime, humanizePointDatetimeDueTime, humanizePointDatetimeDueDate, generateRandomMock, timeDifferenceHours, timeDifferenceMinutes };
