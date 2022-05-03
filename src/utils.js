import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeTaskDueDate = (dueDate) => dayjs(dueDate).format('MMM D');
const humanizeTaskDueTime = (dueTime) => dayjs(dueTime).format('HH:mm');

const generateRandomMock = (mockArray) => {
  const randomIndex = getRandomInteger(0, mockArray.length - 1);
  return mockArray[randomIndex];
};

export { getRandomInteger, humanizeTaskDueDate, humanizeTaskDueTime, generateRandomMock};
