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
    case "5D":
      date.setDate(date.getDate() - 10);
      break;
    case "1M":
      date.setMonth(date.getMonth() - 1);
      break;
  }

  const startDate = dateFormat(date);

  return [startDate, endDate];
};
