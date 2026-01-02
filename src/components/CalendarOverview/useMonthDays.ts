import { useMemo } from "react";
import { getDaysInMonth, getFirstDayOfMonth } from "./utils";

/**
 * useMonthDays - Hook that generates the days array for a calendar month.
 *
 * Returns an array of day numbers (1-31) with leading nulls for alignment.
 * The nulls represent empty cells before the first day of the month to
 * align with the correct day of the week.
 *
 * @param year - The full year (e.g., 2026)
 * @param month - The month index (0-11)
 * @returns Array of day numbers with leading nulls for grid alignment
 *
 * @example
 * // If January 2026 starts on Thursday (index 4)
 * const days = useMonthDays(2026, 0);
 * // Returns: [null, null, null, null, 1, 2, 3, 4, ... 31]
 */
export function useMonthDays(year: number, month: number): (number | null)[] {
  return useMemo(() => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days: (number | null)[] = [];

    // Add leading nulls for alignment
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add day numbers
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  }, [year, month]);
}

/**
 * useToday - Hook that returns today's date as a stable object.
 *
 * @returns Object with year, month, and day properties
 */
export function useToday() {
  return useMemo(() => {
    const today = new Date();
    return {
      year: today.getFullYear(),
      month: today.getMonth(),
      day: today.getDate(),
    };
  }, []);
}
