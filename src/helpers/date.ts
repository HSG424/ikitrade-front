import { Intervals } from "../types/types";

export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const dateFormat = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const startEndDateCalc = (interval: Intervals) => {
  const date = new Date();
  const endDate = dateFormat(date);

  switch (interval) {
    case "6D":
    case "1M":
      date.setMonth(date.getMonth() - 1);
      break;
    case "6M":
      date.setMonth(date.getMonth() - 6);
      break;
    case "1Y":
      date.setFullYear(date.getFullYear() - 1);
      break;
    case "5Y":
      date.setFullYear(date.getFullYear() - 5);
      break;
  }

  const startDate = dateFormat(date);

  return [startDate, endDate];
};
