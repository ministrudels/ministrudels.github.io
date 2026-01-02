import { Typography } from "@mui/material";

import DayCell from "../DayCell";
import { DAYS, MONTHS } from "../constants";
import { DateSelectHandler, SelectedDate } from "../types";
import { useMonthDays, useToday, EventsByDate, getEventsForDay } from "../hooks";
import { isSameDay } from "../utils";

import "./MiniMonthGrid.css";

type MiniMonthGridProps = {
  /** The month to display (0-11) */
  month: number;
  /** The year to display */
  year: number;
  /** The currently selected date */
  selectedDate: SelectedDate;
  /** Callback when a day is selected (year, month, day) */
  onSelectDate: DateSelectHandler;
  /** Size of each day cell in pixels (default: 32) */
  daySize?: number;
  /** Events grouped by date from Google Calendar */
  eventsByDate?: EventsByDate;
};

/**
 * MiniMonthGrid - A compact month view for the full year display.
 *
 * Similar to MonthGrid but without navigation controls, designed to be
 * displayed in a grid of 12 months for the year overview.
 */
export default function MiniMonthGrid({
  month,
  year,
  selectedDate,
  onSelectDate,
  daySize = 32,
  eventsByDate = {},
}: MiniMonthGridProps) {
  const todayDate = useToday();
  const days = useMonthDays(year, month);
  const gridWidth = daySize * 7 + 6 * 2;

  return (
    <div style={{ width: gridWidth }}>
      <Typography variant="subtitle2" className="mini-month-grid__title">
        {MONTHS[month]}
      </Typography>

      <div className="mini-month-grid__days">
        {DAYS.map((day) => (
          <div
            key={day}
            className="mini-month-grid__day-header"
            style={{
              fontSize: daySize * 0.4,
              height: daySize * 0.5,
            }}
          >
            {day.charAt(0)}
          </div>
        ))}

        {days.map((day, index) => (
          <DayCell
            key={index}
            day={day}
            size={daySize}
            isSelected={
              selectedDate.day === day &&
              selectedDate.month === month &&
              selectedDate.year === year
            }
            isToday={
              day !== null &&
              isSameDay(todayDate, { year, month, day })
            }
            eventCount={
              day !== null
                ? getEventsForDay(eventsByDate, year, month, day).length
                : 0
            }
            onClick={() => day && onSelectDate(year, month, day)}
          />
        ))}
      </div>
    </div>
  );
}
