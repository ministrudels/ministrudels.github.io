import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { CalendarEvent } from "../hooks";
import { MONTHS } from "../constants";
import { SelectedDate } from "../types";

import "./DayDetail.css";

type DayDetailProps = {
  /** The selected date to display details for */
  selectedDate: SelectedDate;
  /** Events for the selected day */
  events: CalendarEvent[];
  /** Callback to close the detail view */
  onClose: () => void;
};

function formatTime(event: CalendarEvent): string {
  if (event.start.date) {
    return "All day";
  }
  if (event.start.dateTime) {
    const start = new Date(event.start.dateTime);
    const end = event.end.dateTime ? new Date(event.end.dateTime) : null;

    const startTime = start.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    if (end) {
      const endTime = end.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
      return `${startTime} - ${endTime}`;
    }
    return startTime;
  }
  return "";
}

function getDayOfWeek(year: number, month: number, day: number): string {
  const date = new Date(year, month, day);
  return date.toLocaleDateString([], { weekday: "long" });
}

export default function DayDetail({
  selectedDate,
  events,
  onClose,
}: DayDetailProps) {
  const { year, month, day } = selectedDate;
  const isOpen = day !== null;

  if (!isOpen) return null;

  const dayOfWeek = getDayOfWeek(year, month, day);
  const title = `${dayOfWeek}, ${MONTHS[month]} ${day}, ${year}`;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
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
          <List disablePadding>
            {events.map((event) => (
              <ListItem
                key={event.id}
                className="day-detail__event"
                secondaryAction={
                  <IconButton
                    edge="end"
                    href={event.htmlLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                  >
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={event.summary}
                  secondary={formatTime(event)}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
}
