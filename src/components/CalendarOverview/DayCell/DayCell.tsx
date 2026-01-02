import "./DayCell.css";

type DayCellProps = {
  /** The day number (1-31), or null for empty cells */
  day: number | null;
  /** Whether this day is currently selected */
  isSelected: boolean;
  /** Whether this day is today's date */
  isToday: boolean;
  /** The size of the cell in pixels (width and height) */
  size: number;
  /** Number of events on this day (optional) */
  eventCount?: number;
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
 * - Selected: Blue background with white text
 * - Today: Light blue background with bold text
 * - Default: Transparent background
 * - Has events: Shows colored dot below the day number
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
 *   eventCount={3}
 *   onClick={() => handleSelectDay(15)}
 * />
 */
export default function DayCell({
  day,
  isSelected,
  isToday,
  size,
  eventCount = 0,
  onClick,
}: DayCellProps) {
  if (day === null) {
    return (
      <div
        className="day-cell day-cell--empty"
        style={{ width: size, height: size }}
      />
    );
  }

  const classNames = [
    "day-cell",
    isSelected && "day-cell--selected",
    isToday && !isSelected && "day-cell--today",
    eventCount > 0 && "day-cell--has-events",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classNames}
      onClick={onClick}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
      }}
    >
      <span className="day-cell__number">{day}</span>
      {eventCount > 0 && (
        <span
          className="day-cell__event-dot"
          style={{
            width: Math.max(4, size * 0.15),
            height: Math.max(4, size * 0.15),
          }}
        />
      )}
    </div>
  );
}
