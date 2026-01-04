import CalendarHeader from "../CalendarHeader";
import MonthGrid from "../MonthGrid";
import { DateSelectHandler, SelectedDate } from "../types";
import { EventsByDate } from "../hooks";

import "./FullYearGrid.css";

type FullYearGridProps = {
  year: number;
  selectedDate: SelectedDate;
  onPrev: () => void;
  onNext: () => void;
  onSelectDate: DateSelectHandler;
  daySize?: number;
  eventsByDate?: EventsByDate;
};

export default function FullYearGrid({
  year,
  selectedDate,
  onPrev,
  onNext,
  onSelectDate,
  daySize = 32,
  eventsByDate = {},
}: FullYearGridProps) {
  return (
    <div>
      <CalendarHeader
        title={String(year)}
        onPrev={onPrev}
        onNext={onNext}
        variant="h5"
        className="full-year-grid__header"
      />

      <div className="full-year-grid__months">
        {Array.from({ length: 12 }, (_, month) => (
          <MonthGrid
            key={month}
            month={month}
            year={year}
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
            daySize={daySize}
            eventsByDate={eventsByDate}
            compact
          />
        ))}
      </div>
    </div>
  );
}
