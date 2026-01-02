import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import FullYearGrid from "../FullYearGrid";
import MonthGrid from "../MonthGrid";
import { DateSelectHandler, SelectedDate, ViewMode } from "../types";
import { EventsByDate } from "../hooks";

import "./CalendarContent.css";

type CalendarContentProps = {
  /** Current view mode ("month" or "year") */
  viewMode: ViewMode;
  /** Callback when view mode is changed via toggle buttons */
  onViewModeChange: (mode: ViewMode) => void;
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
  /** Callback to navigate to the previous year */
  onPrevYear: () => void;
  /** Callback to navigate to the next year */
  onNextYear: () => void;
  /** Callback when a day is selected (year, month, day) */
  onSelectDate: DateSelectHandler;
  /** Size of each day cell in pixels for month view (default: 36) */
  daySize?: number;
  /** Size of each day cell in pixels for year view mini months (default: 32) */
  yearDaySize?: number;
  /** Events grouped by date from Google Calendar */
  eventsByDate?: EventsByDate;
};

/**
 * CalendarContent - Container that switches between MonthGrid and YearGrid views.
 *
 * Provides:
 * - Toggle button group to switch between "Month" and "Year" views
 * - Renders the appropriate grid component based on viewMode
 * - Passes through all navigation and selection callbacks
 *
 * This component is used by CalendarOverview for both the inline card view
 * and the expanded dialog view, with different size props for each.
 *
 * @example
 * <CalendarContent
 *   viewMode="month"
 *   onViewModeChange={setViewMode}
 *   currentMonth={0}
 *   currentYear={2026}
 *   selectedDate={{ year: 2026, month: 0, day: null }}
 *   onPrevMonth={handlePrevMonth}
 *   onNextMonth={handleNextMonth}
 *   onPrevYear={handlePrevYear}
 *   onNextYear={handleNextYear}
 *   onSelectDate={(year, month, day) => setSelectedDate({ year, month, day })}
 *   daySize={48}
 *   yearDaySize={32}
 * />
 */
export default function CalendarContent({
  viewMode,
  onViewModeChange,
  currentMonth,
  currentYear,
  selectedDate,
  onPrevMonth,
  onNextMonth,
  onPrevYear,
  onNextYear,
  onSelectDate,
  daySize = 36,
  yearDaySize = 32,
  eventsByDate = {},
}: CalendarContentProps) {
  return (
    <div>
      <div className="calendar-content__toggle">
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_, value) => value && onViewModeChange(value)}
          size="small"
        >
          <ToggleButton value="month">Month</ToggleButton>
          <ToggleButton value="year">Year</ToggleButton>
        </ToggleButtonGroup>
      </div>

      {viewMode === "month" ? (
        <MonthGrid
          currentMonth={currentMonth}
          currentYear={currentYear}
          selectedDate={selectedDate}
          onPrevMonth={onPrevMonth}
          onNextMonth={onNextMonth}
          onSelectDate={onSelectDate}
          daySize={daySize}
          eventsByDate={eventsByDate}
        />
      ) : (
        <FullYearGrid
          currentYear={currentYear}
          selectedDate={selectedDate}
          onPrevYear={onPrevYear}
          onNextYear={onNextYear}
          onSelectDate={onSelectDate}
          daySize={yearDaySize}
          eventsByDate={eventsByDate}
        />
      )}
    </div>
  );
}
