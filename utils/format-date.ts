import { format, parse } from "date-fns";

/**
 * Function for changing date format from "DD-MMMM-YYYY" to "DD-MM-YYYY"
 * @param {string} inputDate - Date string to be formatted
 * @param {string} formatFrom - Format of the input date
 * @param {string} formatTo - Format of the output date
 * @returns
 * @example
 * formatDate({
 *  inputDate: "01 January 2021",
 *  formatFrom: "dd MMMM yyyy",
 *  formatTo: "dd-MM-yyyy",
 * });
 */
interface IFormatDateProps {
  inputDate: string;
  formatFrom: string;
  formatTo: string;
}

export function formatDate({
  inputDate,
  formatFrom = "dd MMMM yyyy",
  formatTo = "dd-MM-yyyy",
}: IFormatDateProps): string {
  const parsedDate = parse(inputDate, formatFrom, new Date());
  const formattedDate = format(parsedDate, formatTo);

  return formattedDate;
}
