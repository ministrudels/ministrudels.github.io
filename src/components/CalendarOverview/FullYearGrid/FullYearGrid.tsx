import CalendarHeader from "../CalendarHeader";
import MiniMonthGrid from "../MiniMonthGrid";
import { DateSelectHandler, SelectedDate } from "../types";
import { EventsByDate } from "../hooks";

import "./FullYearGrid.css";

type FullYearGridProps = {
  /** The year to display */
  currentYear: number;
  /** The currently selected date */
  selectedDate: SelectedDate;
  /** Callback to navigate to the previous period */
  onPrev: () => void;
  /** Callback to navigate to the next period */
  onNext: () => void;
  /** Callback when a day is selected (year, month, day) */
  onSelectDate: DateSelectHandler;
  /** Size of each day cell in pixels (default: 32) */
  daySize?: number;
  /** Events grouped by date from Google Calendar */
  eventsByDate?: EventsByDate;
};

/**
 * FullYearGrid - Displays all 12 months of a year with all days visible.
 *
 * Shows a complete year overview with:
 * - Header showing year and prev/next navigation buttons
 * - 4x3 grid of MiniMonthGrid components (one for each month)
 * - Each month shows all its days in a mini calendar format
 *
 * This provides a comprehensive view of the entire year at a glance.
 */
export default function FullYearGrid({
  currentYear,
  selectedDate,
  onPrev,
  onNext,
  onSelectDate,
  daySize = 32,
  eventsByDate = {},
}: FullYearGridProps) {
  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div>
      <CalendarHeader
        title={String(currentYear)}
        onPrev={onPrev}
        onNext={onNext}
        variant="h5"
        className="full-year-grid__header"
      />

      <div className="full-year-grid__months">
        {months.map((month) => (
          <MiniMonthGrid
            key={month}
            month={month}
            year={currentYear}
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
            daySize={daySize}
            eventsByDate={eventsByDate}
          />
        ))}
      </div>
    </div>
  );
}
