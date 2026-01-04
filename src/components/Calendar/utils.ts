/**
 * Returns the number of days in a given month.
 * @param year - The full year (e.g., 2026)
 * @param month - The month index (0-11)
 * @returns The number of days in the month (28-31)
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Returns the day of the week for the first day of a month.
 * @param year - The full year (e.g., 2026)
 * @param month - The month index (0-11)
 * @returns The day of the week (0 = Sunday, 6 = Saturday)
 */
export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

/**
 * Compares two dates to check if they represent the same day.
 * @param date1 - First date object with year, month, and day
 * @param date2 - Second date object with year, month, and day
 * @returns True if both dates represent the same day
 */
export function isSameDay(
  date1: { year: number; month: number; day: number },
  date2: { year: number; month: number; day: number }
): boolean {
  return (
    date1.year === date2.year &&
    date1.month === date2.month &&
    date1.day === date2.day
  );
}
