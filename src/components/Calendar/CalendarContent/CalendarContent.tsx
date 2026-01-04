import FullYearGrid from "../FullYearGrid";
import { DateSelectHandler, SelectedDate } from "../types";
import { EventsByDate } from "../hooks";

type CalendarContentProps = {
  year: number;
  selectedDate: SelectedDate;
  onPrev: () => void;
  onNext: () => void;
  onSelectDate: DateSelectHandler;
  eventsByDate?: EventsByDate;
};

export default function CalendarContent({
  year,
  selectedDate,
  onPrev,
  onNext,
  onSelectDate,
  eventsByDate = {},
}: CalendarContentProps) {
  return (
    <FullYearGrid
      year={year}
      selectedDate={selectedDate}
      onPrev={onPrev}
      onNext={onNext}
      onSelectDate={onSelectDate}
      eventsByDate={eventsByDate}
    />
  );
}
