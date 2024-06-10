import { DateTime } from 'luxon';

export const getCurrentDate= () => {
  return new Date();
};

export const makeRelativeDate = (date: Date) =>
  DateTime.fromJSDate(date).startOf('day').toRelative();

export const makeDayMonthYear = (date: Date) =>
  DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_FULL);
