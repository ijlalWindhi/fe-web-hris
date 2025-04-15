/**
 * Format currency
 * @param {number} value
 * @returns {string}
 * @example
 * formatCurrency(1000000) // "1.000.000"
 */
export const formatCurrency = (value: number): string => {
  return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
