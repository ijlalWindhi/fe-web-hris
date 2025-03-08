/**
 * Truncate text
 * @param text
 * @param length
 * @returns
 * @example
 * truncateText("Hello, World!", 5) // Hello...
 */
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) {
    return text;
  }
  return text.substring(0, length) + "...";
};
