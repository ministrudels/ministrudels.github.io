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
import { SelectedDate, ViewMode } from "./types";

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
 * - **Year View**: 4x3 grid of all months, click to navigate to that month
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

  const handleSelectMonth = (month: number) => {
    setCurrentMonth(month);
    setViewMode("month");
  };

  const handleSelectDate = (day: number) => {
    setSelectedDate({
      year: currentYear,
      month: currentMonth,
      day,
    });
  };

  return (
    <ExampleContainer
      title="Calendar Overview"
      date={new Date("1 2 2026")}
      tags={["calendar", "date", "grid", "dialog"]}
    >
      <div style={{ position: "relative" }}>
        <IconButton
          onClick={() => setExpanded(true)}
          style={{ position: "absolute", top: 0, right: 0 }}
          size="small"
        >
          <OpenInFullIcon />
        </IconButton>

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
          onSelectMonth={handleSelectMonth}
        />
      </div>

      <Dialog
        open={expanded}
        onClose={() => setExpanded(false)}
        maxWidth="sm"
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
            onSelectMonth={handleSelectMonth}
            daySize={48}
            monthCellSize={80}
          />
        </DialogContent>
      </Dialog>
    </ExampleContainer>
  );
}
