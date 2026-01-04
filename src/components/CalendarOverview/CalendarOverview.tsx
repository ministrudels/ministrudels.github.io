import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

import CalendarContent from "./CalendarContent";
import DayDetail from "./DayDetail";
import ExampleContainer from "../ExampleContainer";
import GoogleAuthButton from "./GoogleAuthButton";
import { SelectedDate, ViewMode } from "./types";
import { useGoogle, getEventsForDay } from "./hooks";

import "./variables.css";
import "./CalendarOverview.css";

export default function CalendarOverview() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    year: today.getFullYear(),
    month: today.getMonth(),
    day: null,
  });
  const [expanded, setExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("month");

  const { isSignedIn, isLoading, error, user, signIn, signOut, eventsByDate } =
    useGoogle(year, viewMode === "month" ? month : undefined);

  const handlePrev = () => {
    if (viewMode === "month") {
      if (month === 0) {
        setMonth(11);
        setYear(year - 1);
      } else {
        setMonth(month - 1);
      }
    } else {
      setYear(year - 1);
    }
  };

  const handleNext = () => {
    if (viewMode === "month") {
      if (month === 11) {
        setMonth(0);
        setYear(year + 1);
      } else {
        setMonth(month + 1);
      }
    } else {
      setYear(year + 1);
    }
  };

  const selectedDayEvents =
    selectedDate.day !== null
      ? getEventsForDay(eventsByDate, selectedDate.year, selectedDate.month, selectedDate.day)
      : [];

  return (
    <ExampleContainer
      title="Calendar Overview"
      date={new Date("1 2 2026")}
      tags={["calendar", "date", "grid", "dialog", "google"]}
    >
      <div className="calendar-overview__container">
        <div className="calendar-overview__toolbar">
          <GoogleAuthButton
            isSignedIn={isSignedIn}
            isLoading={isLoading}
            error={error}
            user={user}
            onSignIn={signIn}
            onSignOut={signOut}
          />
          <IconButton onClick={() => setExpanded(true)} size="small">
            <OpenInFullIcon />
          </IconButton>
        </div>

        <CalendarContent
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          month={month}
          year={year}
          selectedDate={selectedDate}
          onPrev={handlePrev}
          onNext={handleNext}
          onSelectDate={(y, m, d) => setSelectedDate({ year: y, month: m, day: d })}
          eventsByDate={eventsByDate}
        />
      </div>

      <Dialog
        open={expanded}
        onClose={() => setExpanded(false)}
        maxWidth={viewMode === "year" ? "xl" : "sm"}
        fullWidth
      >
        <DialogTitle>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>Calendar Overview</Grid>
            <Grid item>
              <IconButton onClick={() => setExpanded(false)} size="small">
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <CalendarContent
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            month={month}
            year={year}
            selectedDate={selectedDate}
            onPrev={handlePrev}
            onNext={handleNext}
            onSelectDate={(y, m, d) => setSelectedDate({ year: y, month: m, day: d })}
            daySize={48}
            yearDaySize={32}
            eventsByDate={eventsByDate}
          />
        </DialogContent>
      </Dialog>

      <DayDetail
        selectedDate={selectedDate}
        events={selectedDayEvents}
        onClose={() => setSelectedDate((prev) => ({ ...prev, day: null }))}
      />
    </ExampleContainer>
  );
}
