import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import FullYearGrid from "../FullYearGrid";
import MonthGrid from "../MonthGrid";
import { DateSelectHandler, SelectedDate, ViewMode } from "../types";
import { EventsByDate } from "../hooks";

import "./CalendarContent.css";

type CalendarContentProps = {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  month: number;
  year: number;
  selectedDate: SelectedDate;
  onPrev: () => void;
  onNext: () => void;
  onSelectDate: DateSelectHandler;
  daySize?: number;
  eventsByDate?: EventsByDate;
};

export default function CalendarContent({
  viewMode,
  onViewModeChange,
  month,
  year,
  selectedDate,
  onPrev,
  onNext,
  onSelectDate,
  daySize = 48,
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
          month={month}
          year={year}
          selectedDate={selectedDate}
          onPrev={onPrev}
          onNext={onNext}
          onSelectDate={onSelectDate}
          daySize={daySize}
          eventsByDate={eventsByDate}
        />
      ) : (
        <FullYearGrid
          year={year}
          selectedDate={selectedDate}
          onPrev={onPrev}
          onNext={onNext}
          onSelectDate={onSelectDate}
          eventsByDate={eventsByDate}
        />
      )}
    </div>
  );
}
