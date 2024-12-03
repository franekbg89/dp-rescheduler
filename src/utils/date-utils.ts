import { addWeeks, startOfWeek } from "date-fns";

export const getLastMondayFromDate = (date: Date) => {
  return startOfWeek(date, { weekStartsOn: 1 });
};

export const getNextMonday = (fromDate: Date) => {
  const nextMondayFromDate = startOfWeek(addWeeks(fromDate, 1), {
    weekStartsOn: 1,
  });

  return nextMondayFromDate;
};
