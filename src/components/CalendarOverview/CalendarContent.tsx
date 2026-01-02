import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import FullYearGrid from "./FullYearGrid";
import MonthGrid from "./MonthGrid";
import { DateSelectHandler, SelectedDate, ViewMode } from "./types";

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
  /** Size of each day cell in pixels for year view mini months (default: 24) */
  yearDaySize?: number;
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
 *   yearDaySize={28}
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
  yearDaySize = 36,
}: CalendarContentProps) {
  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}
      >
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
        />
      ) : (
        <FullYearGrid
          currentYear={currentYear}
          selectedDate={selectedDate}
          onPrevYear={onPrevYear}
          onNextYear={onNextYear}
          onSelectDate={onSelectDate}
          daySize={yearDaySize}
        />
      )}
    </div>
  );
}
