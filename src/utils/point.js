import dayjs from 'dayjs';

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) { return 0; }
  if (dateA === null) { return 1; }
  if (dateB === null) { return -1; }
  return null;
};

const sortPointPrice = (pointA, pointB) => {
  if (pointA.basePrice > pointB.basePrice) { return -1; }
  if (pointA.basePrice < pointB.basePrice) { return 1; }
  if (pointA.basePrice === pointB.basePrice) { return 0; }
};

const sortDuration = (pointADuration, pointBDuration) => {
  if (pointADuration > pointBDuration) { return -1; }
  if (pointADuration < pointBDuration) { return 1; }
  if (pointADuration === pointBDuration) { return 0; }
};
const sortPointDay = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);
  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

const sortPointDuration = (pointA, pointB) => {
  const timeDifference = (dateTo, dateFrom) => dayjs(dateTo).diff(dayjs(dateFrom), 'millisecond') ;
  const timeDifferencePointA = timeDifference(pointA.dateTo, pointA.dateFrom);
  const timeDifferencePointB = timeDifference(pointB.dateTo, pointB.dateFrom);
  return sortDuration(timeDifferencePointA, timeDifferencePointB);
};

export { sortPointDay, sortPointDuration, sortPointPrice };
