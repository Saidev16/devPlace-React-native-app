import {
  chartDataPoint,
  chartDataResult,
  DateRange,
  selectedPeriodType,
} from "@/types/types";
import * as FormValidator from "./form-validator";

export const addOneToDate = (date: Date) => {
  date.setDate(date.getDate() + 1);

  return date;
};

export const getDateRange = (period: selectedPeriodType): DateRange => {
  const now = new Date();
  let startDate = new Date();
  let endDate = new Date();

  let labels: string[] = [];
  switch (period) {
    case "weekly":
      startDate = new Date();
      startDate.setDate(now.getDate() - now.getDay());
      labels = ["S", "M", "T", "W", "T", "F", "S"];
      break;

    case "monthly":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      const daysInMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      ).getDate();
      labels = Array.from({ length: daysInMonth }, (_, i) =>
        (i + 1).toString()
      );
      break;

    case "yearly":
      startDate = new Date(now);
      startDate.setMonth(now.getMonth() - 11);
      startDate.setDate(1);
      labels = [];
      const months = [
        "Dec",
        "Nov",
        "Oct",
        "Sep",
        "Aug",
        "Jul",
        "Jun",
        "May",
        "Apr",
        "Mar",
        "Feb",
        "Jan",
      ];
      for (let i = 0; i < 12; i++) {
        labels.push(months[startDate.getMonth()]);
        startDate.setMonth(startDate.getMonth() - 1);
      }

      break;

    default:
      throw new Error("Invalid period type");
  }

  return { startDate, endDate, labels };
};

export const transformData = (
  tasks: chartDataPoint[],
  period: selectedPeriodType,
  labels: string[]
): { data: chartDataResult[]; maxValue: number } => {
  const transfomedData: chartDataResult[] = labels.map((label) => {
    return {
      value: 0,
      label: label,
      totalTasks: 0,
    };
  });

  console.log("labels log", labels);
  console.log("transfomedData1", transfomedData);
  console.log("tasks", tasks);

  let maxValue = 1;

  tasks.forEach((dataPoint) => {
    const completedDate = new Date(dataPoint.date);
    let index: number;

    switch (period) {
      case "weekly":
        console.log("completed date", completedDate);
        index = completedDate.getDay();
        console.log("index of completed date", completedDate);
        break;

      case "monthly":
        index = completedDate.getDate() - 1;
        break;

      case "yearly":
        index = completedDate.getMonth(); // 0-11 for months
        // Adjust index based on current month to match labels array
        const currentMonth = new Date().getMonth();
        index = (index - currentMonth + 12) % 12;
        break;

      default:
        throw new Error("Invalid period type");
    }

    if (index >= 0 && index < transfomedData.length) {
      transfomedData[index].totalTasks++;
      maxValue = Math.max(maxValue, transfomedData[index].totalTasks);

      // Only increment value for completed tasks
      if (dataPoint.isDone) {
        transfomedData[index].value++;
      }
    }
  });

  return { data: transfomedData, maxValue: maxValue };
};
export { FormValidator };
