import { CalendarEvent } from "../hooks";

import "./DayCell.css";

type DayCellProps = {
  day: number | null;
  isSelected: boolean;
  isToday: boolean;
  size: number;
  events?: CalendarEvent[];
  compact?: boolean;
  onClick: () => void;
};

const MAX_VISIBLE_EVENTS = 2;

export default function DayCell({
  day,
  isSelected,
  isToday,
  size,
  events = [],
  compact = false,
  onClick,
}: DayCellProps) {
  const height = compact ? size : size * 2.5;

  if (day === null) {
    return <div className="day-cell day-cell--empty" style={{ width: size, height }} />;
  }

  const classNames = [
    "day-cell",
    isSelected && "day-cell--selected",
    isToday && !isSelected && "day-cell--today",
    events.length > 0 && "day-cell--has-events",
    compact && "day-cell--compact",
  ]
    .filter(Boolean)
    .join(" ");

  const visibleEvents = events.slice(0, MAX_VISIBLE_EVENTS);
  const remainingCount = events.length - MAX_VISIBLE_EVENTS;

  return (
    <div className={classNames} onClick={onClick} style={{ width: size, height }}>
      <span className="day-cell__number" style={{ fontSize: size * 0.35 }}>
        {day}
      </span>
      {compact ? (
        events.length > 0 && (
          <span
            className="day-cell__event-dot"
            style={{ width: Math.max(4, size * 0.15), height: Math.max(4, size * 0.15) }}
          />
        )
      ) : (
        visibleEvents.length > 0 && (
          <div className="day-cell__events">
            {visibleEvents.map((event) => (
              <div key={event.id} className="day-cell__event">
                {event.summary}
              </div>
            ))}
            {remainingCount > 0 && <div className="day-cell__more">+{remainingCount} more</div>}
          </div>
        )
      )}
    </div>
  );
}
