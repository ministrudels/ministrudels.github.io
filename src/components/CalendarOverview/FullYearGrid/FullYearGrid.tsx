import CalendarHeader from "../CalendarHeader";
import { MONTHS } from "../constants";
import { DateSelectHandler, SelectedDate } from "../types";
import { EventsByDate, getEventsForDay, useToday } from "../hooks";
import { isSameDay, getFirstDayOfMonth, getDaysInMonth } from "../utils";

import "./FullYearGrid.css";

type FullYearGridProps = {
  year: number;
  selectedDate: SelectedDate;
  onPrev: () => void;
  onNext: () => void;
  onSelectDate: DateSelectHandler;
  eventsByDate?: EventsByDate;
};

// Max columns needed: 6 weeks × 7 days = 42
// (A month can span up to 6 weeks if it starts on Sunday and has 30-31 days)
const TOTAL_COLUMNS = 37; // 6 leading days max + 31 days
const DAYS_SHORT = ["M", "T", "W", "T", "F", "S", "S"];

// Convert Sunday-based (0=Sun) to Monday-based (0=Mon)
function getMondayBasedFirstDay(year: number, month: number): number {
  const sundayBased = getFirstDayOfMonth(year, month);
  return sundayBased === 0 ? 6 : sundayBased - 1;
}

export default function FullYearGrid({
  year,
  selectedDate,
  onPrev,
  onNext,
  onSelectDate,
  eventsByDate = {},
}: FullYearGridProps) {
  const todayDate = useToday();

  // Generate column headers (cycling day of week)
  const columnHeaders = Array.from({ length: TOTAL_COLUMNS }, (_, i) => DAYS_SHORT[i % 7]);

  return (
    <div className="full-year-grid">
      <CalendarHeader
        title={String(year)}
        onPrev={onPrev}
        onNext={onNext}
        variant="h5"
        className="full-year-grid__header"
      />

      <div className="full-year-grid__table-wrapper">
        <table className="full-year-grid__table">
          <thead>
            <tr>
              <th className="full-year-grid__corner"></th>
              {columnHeaders.map((dayLetter, i) => (
                <th
                  key={i}
                  className={`full-year-grid__day-header ${i % 7 === 5 || i % 7 === 6 ? "full-year-grid__day-header--weekend" : ""}`}
                >
                  {dayLetter}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MONTHS.map((monthName, month) => {
              const firstDay = getMondayBasedFirstDay(year, month);
              const daysInMonth = getDaysInMonth(year, month);

              return (
                <tr key={month}>
                  <th className="full-year-grid__month-header">{monthName}</th>
                  {Array.from({ length: TOTAL_COLUMNS }, (_, colIndex) => {
                    const dayNumber = colIndex - firstDay + 1;
                    const isBeforeMonth = dayNumber < 1;
                    const isAfterMonth = dayNumber > daysInMonth;
                    const isValidDay = !isBeforeMonth && !isAfterMonth;

                    if (!isValidDay) {
                      return (
                        <td
                          key={colIndex}
                          className="full-year-grid__cell full-year-grid__cell--empty full-year-grid__cell--outside"
                        />
                      );
                    }

                    const isSelected =
                      selectedDate.day === dayNumber &&
                      selectedDate.month === month &&
                      selectedDate.year === year;
                    const isToday = isSameDay(todayDate, { year, month, day: dayNumber });
                    const events = getEventsForDay(eventsByDate, year, month, dayNumber);
                    const isWeekend = colIndex % 7 === 5 || colIndex % 7 === 6;

                    const cellClasses = [
                      "full-year-grid__cell",
                      isSelected && "full-year-grid__cell--selected",
                      isToday && !isSelected && "full-year-grid__cell--today",
                      events.length > 0 && "full-year-grid__cell--has-events",
                      isWeekend && !isSelected && "full-year-grid__cell--weekend",
                    ]
                      .filter(Boolean)
                      .join(" ");

                    return (
                      <td
                        key={colIndex}
                        className={cellClasses}
                        onClick={() => onSelectDate(year, month, dayNumber)}
                        title={events.length > 0 ? `${events.length} event(s)` : undefined}
                      >
                        <span className="full-year-grid__day-number">{dayNumber}</span>
                        {events.length > 0 && (
                          <span className="full-year-grid__event-indicator" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
