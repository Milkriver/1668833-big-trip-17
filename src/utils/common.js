import dayjs from 'dayjs';

const humanizePointDueDate = (dueDate) => dayjs(dueDate).format('MMM D');
const humanizePointDueTime = (dueTime) => dayjs(dueTime).format('HH:mm');
const humanizePointDatetimeDueDate = (dueDate) => dayjs(dueDate).format('YYYY-MM-DD');
const humanizePointDatetimeDueTime = (dueTime) => dayjs(dueTime).format('YYYY-MM-DDTHH:mm');
const humanizeEditPointDatetimeDueTime = (dueTime) => dayjs(dueTime).format('DD/MM/YY HH:mm');
const timeDifferenceDays = (dateTo, dateFrom) => Math.floor(dayjs(dateTo).diff(dayjs(dateFrom), 'minute') / (60 * 24));
const timeDifferenceHours = (dateTo, dateFrom) => Math.floor(dayjs(dateTo).diff(dayjs(dateFrom), 'minute') / 60);
const timeDifferenceMinutes = (dateTo, dateFrom) => dayjs(dateTo).diff(dayjs(dateFrom), 'minute') % 60;


export { humanizePointDueDate, humanizePointDueTime, humanizeEditPointDatetimeDueTime, humanizePointDatetimeDueTime, humanizePointDatetimeDueDate, timeDifferenceDays, timeDifferenceHours, timeDifferenceMinutes };
