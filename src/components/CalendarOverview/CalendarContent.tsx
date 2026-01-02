import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import MonthGrid from "./MonthGrid";
import YearGrid from "./YearGrid";
import { SelectedDate, ViewMode } from "./types";

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
  /** Callback when a day is selected in month view */
  onSelectDate: (day: number) => void;
  /** Callback when a month is selected in year view */
  onSelectMonth: (month: number) => void;
  /** Size of each day cell in pixels for month view (default: 36) */
  daySize?: number;
  /** Size of each month cell in pixels for year view (default: 60) */
  monthCellSize?: number;
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
 *   onSelectDate={handleSelectDate}
 *   onSelectMonth={handleSelectMonth}
 *   daySize={48}
 *   monthCellSize={80}
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
  onSelectMonth,
  daySize = 36,
  monthCellSize = 60,
}: CalendarContentProps) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
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
        <YearGrid
          currentYear={currentYear}
          currentMonth={currentMonth}
          onPrevYear={onPrevYear}
          onNextYear={onNextYear}
          onSelectMonth={onSelectMonth}
          cellSize={monthCellSize}
        />
      )}
    </div>
  );
}
