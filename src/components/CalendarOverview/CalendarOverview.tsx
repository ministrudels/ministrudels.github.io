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
import ExampleContainer from "../ExampleContainer";
import GoogleAuthButton from "./GoogleAuthButton";
import { SelectedDate, ViewMode } from "./types";
import { useGoogleAuth, useGoogleCalendar } from "./hooks";

import "./variables.css";
import "./CalendarOverview.css";

/**
 * CalendarOverview - Main calendar sandbox component.
 *
 * A fully interactive calendar component that demonstrates:
 * - Month and Year view modes with toggle switching
 * - Date selection and navigation
 * - Expandable dialog for a larger view
 *
 * Features:
 * - **Month View**: Traditional calendar grid showing days of the month
 * - **Year View**: 4x3 grid of all months with all days visible
 * - **Expand Button**: Opens a larger dialog version of the calendar
 * - **State Sync**: Selection and view mode are synced between card and dialog
 *
 * State Management:
 * - `currentMonth` / `currentYear`: Controls which month/year is displayed
 * - `selectedDate`: Tracks the user's selected date (year, month, day)
 * - `viewMode`: "month" or "year" view toggle
 * - `expanded`: Whether the dialog is open
 *
 * @example
 * // Used in Studio.tsx
 * <CalendarOverview />
 */
export default function CalendarOverview() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    year: today.getFullYear(),
    month: today.getMonth(),
    day: null,
  });
  const [expanded, setExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("month");

  // Google Calendar integration
  const googleAuth = useGoogleAuth();
  const { eventsByDate } = useGoogleCalendar(
    googleAuth.accessToken,
    currentYear,
    currentMonth
  );

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePrevYear = () => {
    setCurrentYear(currentYear - 1);
  };

  const handleNextYear = () => {
    setCurrentYear(currentYear + 1);
  };

  const handleSelectDate = (year: number, month: number, day: number) => {
    setSelectedDate({ year, month, day });
  };

  return (
    <ExampleContainer
      title="Calendar Overview"
      date={new Date("1 2 2026")}
      tags={["calendar", "date", "grid", "dialog", "google"]}
    >
      <div className="calendar-overview__container">
        <div className="calendar-overview__toolbar">
          <GoogleAuthButton
            isSignedIn={googleAuth.isSignedIn}
            isLoading={googleAuth.isLoading}
            isConfigured={googleAuth.isConfigured}
            error={googleAuth.error}
            user={googleAuth.user}
            onSignIn={googleAuth.signIn}
            onSignOut={googleAuth.signOut}
          />
          <IconButton
            className="calendar-overview__expand-button"
            onClick={() => setExpanded(true)}
            size="small"
          >
            <OpenInFullIcon />
          </IconButton>
        </div>

        <CalendarContent
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          currentMonth={currentMonth}
          currentYear={currentYear}
          selectedDate={selectedDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onPrevYear={handlePrevYear}
          onNextYear={handleNextYear}
          onSelectDate={handleSelectDate}
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
            currentMonth={currentMonth}
            currentYear={currentYear}
            selectedDate={selectedDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onPrevYear={handlePrevYear}
            onNextYear={handleNextYear}
            onSelectDate={handleSelectDate}
            daySize={48}
            yearDaySize={32}
            eventsByDate={eventsByDate}
          />
        </DialogContent>
      </Dialog>
    </ExampleContainer>
  );
}
