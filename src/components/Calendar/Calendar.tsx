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
import { SelectedDate } from "./types";
import { useGoogle, getEventsForDay } from "./hooks";

import "./variables.css";
import "./Calendar.css";

export default function Calendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    year: today.getFullYear(),
    month: today.getMonth(),
    day: null,
  });
  const [expanded, setExpanded] = useState(false);

  const { isSignedIn, isLoading, error, user, signIn, signOut, eventsByDate } =
    useGoogle(year);

  const handlePrev = () => setYear(year - 1);
  const handleNext = () => setYear(year + 1);

  const selectedDayEvents =
    selectedDate.day !== null
      ? getEventsForDay(
          eventsByDate,
          selectedDate.year,
          selectedDate.month,
          selectedDate.day
        )
      : [];

  return (
    <ExampleContainer
      title="Calendar"
      date={new Date("1 2 2026")}
      tags={["google api"]}
    >
      <div className="calendar__container">
        <div className="calendar__toolbar">
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
          year={year}
          selectedDate={selectedDate}
          onPrev={handlePrev}
          onNext={handleNext}
          onSelectDate={(y, m, d) =>
            setSelectedDate({ year: y, month: m, day: d })
          }
          eventsByDate={eventsByDate}
        />
      </div>

      <Dialog
        open={expanded}
        onClose={() => setExpanded(false)}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>Calendar</Grid>
            <Grid item>
              <IconButton onClick={() => setExpanded(false)} size="small">
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <CalendarContent
            year={year}
            selectedDate={selectedDate}
            onPrev={handlePrev}
            onNext={handleNext}
            onSelectDate={(y, m, d) =>
              setSelectedDate({ year: y, month: m, day: d })
            }
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
