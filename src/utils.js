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
const timeDifferenceHours = (dateTo, dateFrom) => Math.floor(dayjs(dateTo).diff(dayjs(dateFrom), 'minute') / 60);
const timeDifferenceMinutes = (dateTo, dateFrom) => dayjs(dateTo).diff(dayjs(dateFrom), 'minute') % 60;

const generateRandomMock = (mockArray) => {
  const randomIndex = getRandomInteger(0, mockArray.length - 1);
  return mockArray[randomIndex];
};

export { getRandomInteger, humanizePointDueDate, humanizePointDueTime, humanizePointDatetimeDueTime, humanizePointDatetimeDueDate, generateRandomMock, timeDifferenceHours, timeDifferenceMinutes };
