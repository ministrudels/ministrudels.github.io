import { Grid, Typography } from "@mui/material";
import { useState } from "react";

import ExampleContainer from "../ExampleContainer";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export default function CalendarOverview() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };

  const isToday = (day: number) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <ExampleContainer
      title="Calendar Overview"
      date={new Date("1 2 2026")}
      tags={["calendar", "date", "grid"]}
    >
      <div style={{ maxWidth: 350, margin: "auto" }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ marginBottom: 16 }}
        >
          <Grid item>
            <button onClick={handlePrevMonth} style={{ cursor: "pointer" }}>
              {"<"}
            </button>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              {MONTHS[currentMonth]} {currentYear}
            </Typography>
          </Grid>
          <Grid item>
            <button onClick={handleNextMonth} style={{ cursor: "pointer" }}>
              {">"}
            </button>
          </Grid>
        </Grid>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 4,
            textAlign: "center",
          }}
        >
          {DAYS.map((day) => (
            <div
              key={day}
              style={{ fontWeight: "bold", padding: 8, fontSize: 12 }}
            >
              {day}
            </div>
          ))}

          {days.map((day, index) => (
            <div
              key={index}
              onClick={() => day && setSelectedDate(day)}
              style={{
                padding: 8,
                cursor: day ? "pointer" : "default",
                borderRadius: 4,
                backgroundColor:
                  selectedDate === day
                    ? "#1976d2"
                    : isToday(day as number)
                      ? "#e3f2fd"
                      : "transparent",
                color: selectedDate === day ? "white" : "inherit",
                fontWeight: isToday(day as number) ? "bold" : "normal",
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {selectedDate && (
          <Typography
            variant="body2"
            style={{ marginTop: 16, textAlign: "center" }}
          >
            Selected: {MONTHS[currentMonth]} {selectedDate}, {currentYear}
          </Typography>
        )}
      </div>
    </ExampleContainer>
  );
}
