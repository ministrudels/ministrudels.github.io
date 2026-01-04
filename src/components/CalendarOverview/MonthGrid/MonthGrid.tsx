import { Typography } from "@mui/material";

import CalendarHeader from "../CalendarHeader";
import DayCell from "../DayCell";
import { DAYS, MONTHS } from "../constants";
import { DateSelectHandler, SelectedDate } from "../types";
import { useMonthDays, useToday, EventsByDate, getEventsForDay } from "../hooks";
import { isSameDay } from "../utils";

import "./MonthGrid.css";

type MonthGridProps = {
  month: number;
  year: number;
  selectedDate: SelectedDate;
  onSelectDate: DateSelectHandler;
  onPrev?: () => void;
  onNext?: () => void;
  compact?: boolean;
  daySize?: number;
  eventsByDate?: EventsByDate;
};

export default function MonthGrid({
  month,
  year,
  selectedDate,
  onSelectDate,
  onPrev,
  onNext,
  compact = false,
  daySize = compact ? 32 : 48,
  eventsByDate = {},
}: MonthGridProps) {
  const todayDate = useToday();
  const days = useMonthDays(year, month);
  const gap = compact ? 2 : 4;
  const gridWidth = daySize * 7 + 6 * gap;

  return (
    <div className="month-grid" style={{ width: gridWidth }}>
      {compact ? (
        <Typography variant="subtitle2" className="month-grid__title">
          {MONTHS[month]}
        </Typography>
      ) : (
        <CalendarHeader
          title={`${MONTHS[month]} ${year}`}
          onPrev={onPrev!}
          onNext={onNext!}
          className="month-grid__header"
        />
      )}

      <div className="month-grid__days" style={{ gap }}>
        {DAYS.map((day) => (
          <div
            key={day}
            className="month-grid__day-header"
            style={{ fontSize: daySize * (compact ? 0.4 : 0.35), height: daySize * (compact ? 0.5 : 0.6) }}
          >
            {compact ? day.charAt(0) : day}
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
            isToday={day !== null && isSameDay(todayDate, { year, month, day })}
            events={day !== null ? getEventsForDay(eventsByDate, year, month, day) : []}
            compact={compact}
            onClick={() => day && onSelectDate(year, month, day)}
          />
        ))}
      </div>
    </div>
  );
}
