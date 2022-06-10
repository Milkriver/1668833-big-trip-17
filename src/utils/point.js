import dayjs from 'dayjs';

const sortPointPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sortPointDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortPointDuration = (pointA, pointB) => {
  const timeDifference = (dateTo, dateFrom) => dayjs(dateTo).diff(dayjs(dateFrom), 'millisecond');
  const timeDifferencePointA = timeDifference(pointA.dateTo, pointA.dateFrom);
  const timeDifferencePointB = timeDifference(pointB.dateTo, pointB.dateFrom);
  return timeDifferencePointB - timeDifferencePointA;
};

const isPointInFuture = (date) => {
  const today = dayjs();
  return dayjs(date).diff(today, 'days') > 0;
};

const isPointInPast = (date) => {
  const today = dayjs();
  return dayjs(today).diff(dayjs(date)) > 0;
};

export { sortPointDay, sortPointDuration, sortPointPrice, isPointInFuture, isPointInPast };
