import { Grid, Typography } from "@mui/material";

import { MONTHS_SHORT } from "./constants";

type YearGridProps = {
  /** The current year being displayed */
  currentYear: number;
  /** The currently selected month (0-11), used for highlighting */
  currentMonth: number;
  /** Callback to navigate to the previous year */
  onPrevYear: () => void;
  /** Callback to navigate to the next year */
  onNextYear: () => void;
  /** Callback when a month is selected */
  onSelectMonth: (month: number) => void;
  /** Size of each month cell in pixels (default: 60) */
  cellSize?: number;
};

/**
 * YearGrid - Displays all 12 months of a year in a 4x3 grid.
 *
 * Provides a year-level view of the calendar with:
 * - Header showing year and prev/next navigation buttons
 * - 4-column grid of month abbreviations (Jan-Dec)
 *
 * Visual states for months:
 * - Selected: Blue background (#1976d2) with white text
 * - Current month (today): Light blue background (#e3f2fd) with bold text
 * - Default: Transparent background
 *
 * Clicking a month triggers onSelectMonth, typically used to switch
 * to the month view for that month.
 *
 * @example
 * <YearGrid
 *   currentYear={2026}
 *   currentMonth={5}
 *   onPrevYear={() => {}}
 *   onNextYear={() => {}}
 *   onSelectMonth={(month) => console.log(month)}
 *   cellSize={70}
 * />
 */
export default function YearGrid({
  currentYear,
  currentMonth,
  onPrevYear,
  onNextYear,
  onSelectMonth,
  cellSize = 60,
}: YearGridProps) {
  const today = new Date();
  const isCurrentMonth = (month: number) =>
    month === today.getMonth() && currentYear === today.getFullYear();

  const gridWidth = cellSize * 4 + 3 * 8; // 4 columns + gaps

  return (
    <div style={{ width: gridWidth, margin: "auto" }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: 16 }}
      >
        <Grid item>
          <button onClick={onPrevYear} style={{ cursor: "pointer" }}>
            {"<"}
          </button>
        </Grid>
        <Grid item>
          <Typography variant="h6">{currentYear}</Typography>
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
          gap: 8,
          textAlign: "center",
        }}
      >
        {MONTHS_SHORT.map((month, index) => (
          <div
            key={month}
            onClick={() => onSelectMonth(index)}
            style={{
              width: cellSize,
              height: cellSize * 0.6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              borderRadius: 4,
              backgroundColor:
                currentMonth === index
                  ? "#1976d2"
                  : isCurrentMonth(index)
                    ? "#e3f2fd"
                    : "transparent",
              color: currentMonth === index ? "white" : "inherit",
              fontWeight: isCurrentMonth(index) ? "bold" : "normal",
              fontSize: cellSize * 0.25,
            }}
          >
            {month}
          </div>
        ))}
      </div>
    </div>
  );
}
