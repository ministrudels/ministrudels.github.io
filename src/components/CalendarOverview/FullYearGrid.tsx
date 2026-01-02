import { Typography } from "@mui/material";

import MiniMonthGrid from "./MiniMonthGrid";
import { DateSelectHandler, SelectedDate } from "./types";

import "./FullYearGrid.css";

type FullYearGridProps = {
  /** The year to display */
  currentYear: number;
  /** The currently selected date */
  selectedDate: SelectedDate;
  /** Callback to navigate to the previous year */
  onPrevYear: () => void;
  /** Callback to navigate to the next year */
  onNextYear: () => void;
  /** Callback when a day is selected (year, month, day) */
  onSelectDate: DateSelectHandler;
  /** Size of each day cell in pixels (default: 32) */
  daySize?: number;
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
  onPrevYear,
  onNextYear,
  onSelectDate,
  daySize = 32,
}: FullYearGridProps) {
  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div>
      <div className="full-year-grid__header">
        <button className="full-year-grid__nav-button" onClick={onPrevYear}>
          {"<"}
        </button>
        <Typography variant="h5">{currentYear}</Typography>
        <button className="full-year-grid__nav-button" onClick={onNextYear}>
          {">"}
        </button>
      </div>

      <div className="full-year-grid__months">
        {months.map((month) => (
          <MiniMonthGrid
            key={month}
            month={month}
            year={currentYear}
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
            daySize={daySize}
          />
        ))}
      </div>
    </div>
  );
}
