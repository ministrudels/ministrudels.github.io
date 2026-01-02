import { COLORS } from "./constants";

type DayCellProps = {
  /** The day number (1-31), or null for empty cells */
  day: number | null;
  /** Whether this day is currently selected */
  isSelected: boolean;
  /** Whether this day is today's date */
  isToday: boolean;
  /** The size of the cell in pixels (width and height) */
  size: number;
  /** Callback when the day is clicked */
  onClick: () => void;
};

/**
 * DayCell - Renders a single day in the calendar month grid.
 *
 * This is the core building block for the calendar. Each cell can display
 * a day number with visual indicators for selection and today's date.
 *
 * Visual states:
 * - Selected: Blue background (#1976d2) with white text
 * - Today: Light blue background (#e3f2fd) with bold text
 * - Default: Transparent background
 *
 * Empty cells (day = null) render as blank spacers to maintain grid alignment
 * for days before the first of the month.
 *
 * @example
 * <DayCell
 *   day={15}
 *   isSelected={false}
 *   isToday={true}
 *   size={36}
 *   onClick={() => handleSelectDay(15)}
 * />
 */
export default function DayCell({
  day,
  isSelected,
  isToday,
  size,
  onClick,
}: DayCellProps) {
  if (day === null) {
    return <div style={{ width: size, height: size }} />;
  }

  return (
    <div
      onClick={onClick}
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        borderRadius: 4,
        backgroundColor: isSelected
          ? COLORS.selected
          : isToday
            ? COLORS.today
            : COLORS.default,
        color: isSelected ? COLORS.selectedText : "inherit",
        fontWeight: isToday ? "bold" : "normal",
        fontSize: size * 0.4,
      }}
    >
      {day}
    </div>
  );
}
