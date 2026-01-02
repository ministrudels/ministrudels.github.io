import { useState, useEffect, useCallback } from "react";

const CALENDAR_API_BASE = "https://www.googleapis.com/calendar/v3";

/**
 * Represents a Google Calendar event.
 */
export type CalendarEvent = {
  id: string;
  summary: string;
  description?: string;
  start: {
    date?: string; // For all-day events (YYYY-MM-DD)
    dateTime?: string; // For timed events (ISO 8601)
  };
  end: {
    date?: string;
    dateTime?: string;
  };
  colorId?: string;
  htmlLink: string;
};

/**
 * Events grouped by date (YYYY-MM-DD format).
 */
export type EventsByDate = Record<string, CalendarEvent[]>;

type CalendarState = {
  events: CalendarEvent[];
  eventsByDate: EventsByDate;
  isLoading: boolean;
  error: string | null;
};

/**
 * useGoogleCalendar - Hook for fetching Google Calendar events.
 *
 * Fetches events from the user's primary calendar for a given date range.
 * Events are grouped by date for easy lookup.
 *
 * Security:
 * - Requires valid access token from useGoogleAuth
 * - Only fetches from user's own calendar
 * - Read-only access (calendar.readonly scope)
 *
 * @param accessToken - OAuth 2.0 access token from useGoogleAuth
 * @param year - Year to fetch events for
 * @param month - Month to fetch events for (0-11)
 *
 * @example
 * const { accessToken } = useGoogleAuth();
 * const { events, eventsByDate, isLoading } = useGoogleCalendar(
 *   accessToken,
 *   2026,
 *   0 // January
 * );
 *
 * // Get events for a specific day
 * const dayEvents = eventsByDate["2026-01-15"] || [];
 */
export function useGoogleCalendar(
  accessToken: string | null,
  year: number,
  month: number
) {
  const [state, setState] = useState<CalendarState>({
    events: [],
    eventsByDate: {},
    isLoading: false,
    error: null,
  });

  const fetchEvents = useCallback(async () => {
    if (!accessToken) {
      setState({
        events: [],
        eventsByDate: {},
        isLoading: false,
        error: null,
      });
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Calculate date range for the month (with buffer for edge events)
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0, 23, 59, 59);

      const params = new URLSearchParams({
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        singleEvents: "true", // Expand recurring events
        orderBy: "startTime",
        maxResults: "250",
      });

      const response = await fetch(
        `${CALENDAR_API_BASE}/calendars/primary/events?${params}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication expired. Please sign in again.");
        }
        throw new Error(`Failed to fetch events: ${response.statusText}`);
      }

      const data = await response.json();
      const events: CalendarEvent[] = data.items || [];

      // Log events to console
      console.log("Google Calendar Events:", events);

      // Group events by date
      const eventsByDate: EventsByDate = {};
      events.forEach((event) => {
        const dateStr = getEventDate(event);
        if (dateStr) {
          if (!eventsByDate[dateStr]) {
            eventsByDate[dateStr] = [];
          }
          eventsByDate[dateStr].push(event);
        }
      });

      setState({
        events,
        eventsByDate,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to fetch events",
      }));
    }
  }, [accessToken, year, month]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    ...state,
    refetch: fetchEvents,
  };
}

/**
 * Extract the date string (YYYY-MM-DD) from an event.
 */
function getEventDate(event: CalendarEvent): string | null {
  const start = event.start;
  if (start.date) {
    // All-day event
    return start.date;
  }
  if (start.dateTime) {
    // Timed event - extract date part
    return start.dateTime.split("T")[0];
  }
  return null;
}

/**
 * Get events for a specific date.
 * @param eventsByDate - Events grouped by date
 * @param year - Year
 * @param month - Month (0-11)
 * @param day - Day of month (1-31)
 */
export function getEventsForDay(
  eventsByDate: EventsByDate,
  year: number,
  month: number,
  day: number
): CalendarEvent[] {
  const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return eventsByDate[dateStr] || [];
}
