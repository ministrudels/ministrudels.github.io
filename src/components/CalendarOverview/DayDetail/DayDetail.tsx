import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { CalendarEvent } from "../hooks";
import { MONTHS } from "../constants";
import { SelectedDate } from "../types";

import "./DayDetail.css";

type DayDetailProps = {
  selectedDate: SelectedDate;
  events: CalendarEvent[];
  onClose: () => void;
};

function formatTime(event: CalendarEvent): string {
  if (event.start.date) return "All day";
  if (event.start.dateTime) {
    const start = new Date(event.start.dateTime);
    const end = event.end.dateTime ? new Date(event.end.dateTime) : null;
    const fmt = { hour: "numeric" as const, minute: "2-digit" as const };
    const startTime = start.toLocaleTimeString([], fmt);
    if (end) return `${startTime} - ${end.toLocaleTimeString([], fmt)}`;
    return startTime;
  }
  return "";
}

function getDayOfWeek(year: number, month: number, day: number): string {
  return new Date(year, month, day).toLocaleDateString([], { weekday: "long" });
}

export default function DayDetail({ selectedDate, events, onClose }: DayDetailProps) {
  const { year, month, day } = selectedDate;
  if (day === null) return null;

  const title = `${getDayOfWeek(year, month, day)}, ${MONTHS[month]} ${day}, ${year}`;

  return (
    <Dialog open={day !== null} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="day-detail__title">
        <div>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {events.length} {events.length === 1 ? "event" : "events"}
          </Typography>
        </div>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {events.length === 0 ? (
          <Typography color="text.secondary" className="day-detail__empty">
            No events scheduled for this day.
          </Typography>
        ) : (
          <div>
            {events.map((event) => (
              <div key={event.id} className="day-detail__event">
                <div className="day-detail__event-title">
                  {event.summary}
                  <IconButton
                    className="day-detail__event-link"
                    href={event.htmlLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                  >
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                </div>
                <div className="day-detail__event-time">{formatTime(event)}</div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
