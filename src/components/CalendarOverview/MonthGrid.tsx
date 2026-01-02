import { Grid, Typography } from "@mui/material";

import DayCell from "./DayCell";
import { DAYS, MONTHS } from "./constants";
import { SelectedDate } from "./types";
import { getDaysInMonth, getFirstDayOfMonth, isSameDay } from "./utils";

type MonthGridProps = {
  /** The current month being displayed (0-11) */
  currentMonth: number;
  /** The current year being displayed */
  currentYear: number;
  /** The currently selected date */
  selectedDate: SelectedDate;
  /** Callback to navigate to the previous month */
  onPrevMonth: () => void;
  /** Callback to navigate to the next month */
  onNextMonth: () => void;
  /** Callback when a day is selected */
  onSelectDate: (day: number) => void;
  /** Size of each day cell in pixels (default: 36) */
  daySize?: number;
};

/**
 * MonthGrid - Displays a single month with navigation and day selection.
 *
 * Renders a traditional calendar month view with:
 * - Header showing month name, year, and prev/next navigation buttons
 * - Day-of-week labels (Sun-Sat)
 * - Grid of DayCell components for each day of the month
 *
 * The grid automatically handles month boundaries, adding empty cells
 * before the first day to align with the correct day of the week.
 *
 * @example
 * <MonthGrid
 *   currentMonth={0}
 *   currentYear={2026}
 *   selectedDate={{ year: 2026, month: 0, day: 15 }}
 *   onPrevMonth={() => {}}
 *   onNextMonth={() => {}}
 *   onSelectDate={(day) => console.log(day)}
 *   daySize={40}
 * />
 */
export default function MonthGrid({
  currentMonth,
  currentYear,
  selectedDate,
  onPrevMonth,
  onNextMonth,
  onSelectDate,
  daySize = 36,
}: MonthGridProps) {
  const today = new Date();
  const todayDate = {
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const gridWidth = daySize * 7 + 6 * 4; // 7 columns + gaps

  return (
    <div style={{ width: gridWidth, margin: "auto" }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: 16 }}
      >
        <Grid item>
          <button onClick={onPrevMonth} style={{ cursor: "pointer" }}>
            {"<"}
          </button>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            {MONTHS[currentMonth]} {currentYear}
          </Typography>
        </Grid>
        <Grid item>
          <button onClick={onNextMonth} style={{ cursor: "pointer" }}>
            {">"}
          </button>
        </Grid>
      </Grid>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 4,
          textAlign: "center",
        }}
      >
        {DAYS.map((day) => (
          <div
            key={day}
            style={{
              fontWeight: "bold",
              fontSize: daySize * 0.35,
              height: daySize * 0.6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {day}
          </div>
        ))}

        {days.map((day, index) => (
          <DayCell
            key={index}
            day={day}
            size={daySize}
            isSelected={
              selectedDate.day === day &&
              selectedDate.month === currentMonth &&
              selectedDate.year === currentYear
            }
            isToday={
              day !== null &&
              isSameDay(todayDate, { year: currentYear, month: currentMonth, day })
            }
            onClick={() => day && onSelectDate(day)}
          />
        ))}
      </div>
    </div>
  );
}
