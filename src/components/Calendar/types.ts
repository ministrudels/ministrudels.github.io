/**
 * Represents a selected date in the calendar.
 * @property year - The full year (e.g., 2026)
 * @property month - The month index (0-11, where 0 = January)
 * @property day - The day of the month (1-31), or null if no day is selected
 */
export type SelectedDate = {
  year: number;
  month: number;
  day: number | null;
};

/**
 * Unified callback type for date selection.
 * All date selection handlers use the same signature for consistency.
 */
export type DateSelectHandler = (year: number, month: number, day: number) => void;
