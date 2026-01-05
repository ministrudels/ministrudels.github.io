import { Typography } from "@mui/material";

import "./CalendarHeader.css";

type CalendarHeaderProps = {
  /** The title to display (e.g., "January 2026" or "2026") */
  title: string;
  /** Callback to navigate to the previous period */
  onPrev: () => void;
  /** Callback to navigate to the next period */
  onNext: () => void;
  /** Typography variant for the title */
  variant?: "h5" | "h6";
  /** Additional CSS class for the header container */
  className?: string;
};

export default function CalendarHeader({
  title,
  onPrev,
  onNext,
  variant = "h6",
  className = "",
}: CalendarHeaderProps) {
  return (
    <div className={`calendar-header ${className}`}>
      <button className="calendar-header__nav-button" onClick={onPrev}>
        {"<"}
      </button>
      <Typography variant={variant}>{title}</Typography>
      <button className="calendar-header__nav-button" onClick={onNext}>
        {">"}
      </button>
    </div>
  );
}
