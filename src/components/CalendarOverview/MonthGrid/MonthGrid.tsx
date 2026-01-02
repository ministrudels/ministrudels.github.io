import { Typography } from "@mui/material";

import DayCell from "../DayCell";
import { DAYS, MONTHS } from "../constants";
import { DateSelectHandler, SelectedDate } from "../types";
import { useMonthDays, useToday, EventsByDate, getEventsForDay } from "../hooks";
import { isSameDay } from "../utils";

import "./MonthGrid.css";

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
  /** Callback when a day is selected (year, month, day) */
  onSelectDate: DateSelectHandler;
  /** Size of each day cell in pixels (default: 36) */
  daySize?: number;
  /** Events grouped by date from Google Calendar */
  eventsByDate?: EventsByDate;
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
 *   onSelectDate={(year, month, day) => console.log(year, month, day)}
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
  eventsByDate = {},
}: MonthGridProps) {
  const todayDate = useToday();
  const days = useMonthDays(currentYear, currentMonth);
  const gridWidth = daySize * 7 + 6 * 4; // 7 columns + gaps

  return (
    <div className="month-grid" style={{ width: gridWidth }}>
      <div className="month-grid__header">
        <button className="month-grid__nav-button" onClick={onPrevMonth}>
          {"<"}
        </button>
        <Typography variant="h6">
          {MONTHS[currentMonth]} {currentYear}
        </Typography>
        <button className="month-grid__nav-button" onClick={onNextMonth}>
          {">"}
        </button>
      </div>

      <div className="month-grid__days">
        {DAYS.map((day) => (
          <div
            key={day}
            className="month-grid__day-header"
            style={{
              fontSize: daySize * 0.35,
              height: daySize * 0.6,
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
            eventCount={
              day !== null
                ? getEventsForDay(eventsByDate, currentYear, currentMonth, day).length
                : 0
            }
            onClick={() => day && onSelectDate(currentYear, currentMonth, day)}
          />
        ))}
      </div>
    </div>
  );
}
