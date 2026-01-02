/**
 * The current view mode of the calendar.
 * - "month": Shows a single month with all days
 * - "year": Shows all 12 months of the year
 */
export type ViewMode = "month" | "year";

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
