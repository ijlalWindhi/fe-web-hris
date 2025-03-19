import { format, parse } from "date-fns";

/**
 * Function for changing date format from "DD-MMMM-YYYY" to "DD-MM-YYYY"
 * @param inputDate
 * @returns
 * @example
 * formatDate("01 August 2021") => "01-08-2021"
 */
export function formatDate(inputDate: string): string {
  const parsedDate = parse(inputDate, "dd MMMM yyyy", new Date());
  const formattedDate = format(parsedDate, "dd-MM-yyyy");

  return formattedDate;
}
