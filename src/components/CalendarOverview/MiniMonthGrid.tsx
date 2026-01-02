import { Typography } from "@mui/material";

import DayCell from "./DayCell";
import { DAYS, MONTHS } from "./constants";
import { SelectedDate } from "./types";
import { getDaysInMonth, getFirstDayOfMonth, isSameDay } from "./utils";

type MiniMonthGridProps = {
  /** The month to display (0-11) */
  month: number;
  /** The year to display */
  year: number;
  /** The currently selected date */
  selectedDate: SelectedDate;
  /** Callback when a day is selected */
  onSelectDate: (month: number, day: number) => void;
  /** Size of each day cell in pixels (default: 24) */
  daySize?: number;
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
  daySize = 24,
}: MiniMonthGridProps) {
  const today = new Date();
  const todayDate = {
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const gridWidth = daySize * 7 + 6 * 2;

  return (
    <div style={{ width: gridWidth }}>
      <Typography
        variant="subtitle2"
        style={{
          textAlign: "center",
          marginBottom: 8,
          fontWeight: "bold",
        }}
      >
        {MONTHS[month]}
      </Typography>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 2,
          textAlign: "center",
        }}
      >
        {DAYS.map((day) => (
          <div
            key={day}
            style={{
              fontWeight: "bold",
              fontSize: daySize * 0.4,
              height: daySize * 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#666",
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
            onClick={() => day && onSelectDate(month, day)}
          />
        ))}
      </div>
    </div>
  );
}
