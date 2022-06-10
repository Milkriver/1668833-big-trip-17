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
  const today = new Date;
  dayjs(date.dateFrom).diff(dayjs(today.dateFrom));
};

const isPointInPast = (date) => {
  const today = new Date;
  dayjs(today.dateFrom).diff(dayjs(date.dateFrom));
};

export { sortPointDay, sortPointDuration, sortPointPrice, isPointInFuture, isPointInPast };
