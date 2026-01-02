import { Grid, Typography } from "@mui/material";

import MiniMonthGrid from "./MiniMonthGrid";
import { SelectedDate } from "./types";

type FullYearGridProps = {
  /** The year to display */
  currentYear: number;
  /** The currently selected date */
  selectedDate: SelectedDate;
  /** Callback to navigate to the previous year */
  onPrevYear: () => void;
  /** Callback to navigate to the next year */
  onNextYear: () => void;
  /** Callback when a day is selected */
  onSelectDate: (month: number, day: number) => void;
  /** Size of each day cell in pixels (default: 24) */
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
  daySize = 24,
}: FullYearGridProps) {
  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ marginBottom: 24 }}
      >
        <Grid item>
          <button onClick={onPrevYear} style={{ cursor: "pointer" }}>
            {"<"}
          </button>
        </Grid>
        <Grid item>
          <Typography variant="h5">{currentYear}</Typography>
        </Grid>
        <Grid item>
          <button onClick={onNextYear} style={{ cursor: "pointer" }}>
            {">"}
          </button>
        </Grid>
      </Grid>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
          justifyItems: "center",
        }}
      >
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
