import * as FormValidator from "./form-validator";

export const addOneToDate = (date: Date) => {
  date.setDate(date.getDate() + 1);

  return date;
};

export { FormValidator };
