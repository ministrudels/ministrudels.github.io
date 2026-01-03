import { useState, useCallback, useEffect } from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import Cookies from "js-cookie";

// =============================================================================
// Types
// =============================================================================

type User = {
  name: string;
  picture: string;
};

export type CalendarEvent = {
  id: string;
  summary: string;
  start: {
    date?: string;
    dateTime?: string;
  };
  end: {
    date?: string;
    dateTime?: string;
  };
  htmlLink: string;
};

export type EventsByDate = Record<string, CalendarEvent[]>;

// =============================================================================
// Helper Functions
// =============================================================================

export function getEventsForDay(
  eventsByDate: EventsByDate | undefined,
  year: number,
  month: number,
  day: number
): CalendarEvent[] {
  if (!eventsByDate) return [];
  const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;
  return eventsByDate[dateStr] || [];
}

type GoogleState = {
  // Auth
  isSignedIn: boolean;
  isLoading: boolean;
  error: string | null;
  user: User | null;
  // Calendar
  events: CalendarEvent[];
  isLoadingEvents: boolean;
};

// =============================================================================
// Constants
// =============================================================================

const COOKIE_NAME = "google_auth";
const COOKIE_EXPIRY_DAYS = 1;
const GAPI_SCRIPT_URL = "https://apis.google.com/js/api.js";

const SCOPES = [
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/calendar.events.readonly",
].join(" ");

const INITIAL_STATE: GoogleState = {
  isSignedIn: false,
  isLoading: false,
  error: null,
  user: null,
  events: [],
  isLoadingEvents: false,
};

// =============================================================================
// Cookie Storage
// =============================================================================

type StoredAuth = {
  accessToken: string;
  user: User | null;
};

function loadFromCookie(): StoredAuth | null {
  const data = Cookies.get(COOKIE_NAME);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

function saveToCookie(auth: StoredAuth): void {
  Cookies.set(COOKIE_NAME, JSON.stringify(auth), {
    expires: COOKIE_EXPIRY_DAYS,
  });
}

function clearCookie(): void {
  Cookies.remove(COOKIE_NAME);
}

// =============================================================================
// GAPI Loader
// =============================================================================

let gapiLoaded = false;
let gapiLoadPromise: Promise<void> | null = null;

function loadGapi(): Promise<void> {
  if (gapiLoaded) return Promise.resolve();
  if (gapiLoadPromise) return gapiLoadPromise;

  gapiLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = GAPI_SCRIPT_URL;
    script.onload = () => {
      gapi.load("client", async () => {
        await gapi.client.init({});
        gapiLoaded = true;
        resolve();
      });
    };
    script.onerror = () => reject(new Error("Failed to load GAPI"));
    document.body.appendChild(script);
  });

  return gapiLoadPromise;
}

function setGapiToken(accessToken: string): void {
  gapi.client.setToken({ access_token: accessToken });
}

// =============================================================================
// Google API Calls
// =============================================================================

async function fetchUserInfo(): Promise<User> {
  const response = await gapi.client.request({
    path: "https://www.googleapis.com/oauth2/v2/userinfo",
  });
  return {
    name: response.result.name,
    picture: response.result.picture,
  };
}

async function fetchCalendarEvents(
  year: number,
  month?: number
): Promise<CalendarEvent[]> {
  // If month is undefined, fetch the entire year
  const timeMin =
    month !== undefined
      ? new Date(year, month, 1).toISOString()
      : new Date(year, 0, 1).toISOString();
  const timeMax =
    month !== undefined
      ? new Date(year, month + 1, 0, 23, 59, 59).toISOString()
      : new Date(year, 11, 31, 23, 59, 59).toISOString();

  const response = await gapi.client.request({
    path: "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    params: {
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: "startTime",
      maxResults: 2500,
    },
  });

  return response.result.items || [];
}

// =============================================================================
// Hook
// =============================================================================

export function useGoogle(year?: number, month?: number) {
  const stored = loadFromCookie();
  const [accessToken, setAccessToken] = useState<string | null>(
    stored?.accessToken || null
  );
  const [state, setState] = useState<GoogleState>(
    stored
      ? { ...INITIAL_STATE, isSignedIn: true, user: stored.user }
      : INITIAL_STATE
  );

  // Initialize GAPI with stored token
  useEffect(() => {
    if (!accessToken) return;

    loadGapi().then(() => {
      setGapiToken(accessToken);
    });
  }, [accessToken]);

  // Fetch calendar events when year/month changes
  useEffect(() => {
    if (!accessToken || year === undefined) return;

    const loadEvents = async () => {
      setState((prev) => ({ ...prev, isLoadingEvents: true }));
      try {
        await loadGapi();
        const events = await fetchCalendarEvents(year, month);
        console.log("=== Calendar Events ===", events);
        setState((prev) => ({ ...prev, events, isLoadingEvents: false }));
      } catch (error) {
        console.error("Failed to fetch calendar events:", error);
        setState((prev) => ({ ...prev, events: [], isLoadingEvents: false }));
      }
    };

    loadEvents();
  }, [accessToken, year, month]);

  // Handle successful login
  const handleLoginSuccess = useCallback(async (token: string) => {
    try {
      await loadGapi();
      setGapiToken(token);

      const user = await fetchUserInfo();
      console.log("=== Google User ===", user.name);

      setAccessToken(token);
      saveToCookie({ accessToken: token, user });
      setState((prev) => ({
        ...prev,
        isSignedIn: true,
        isLoading: false,
        error: null,
        user,
      }));
    } catch {
      setAccessToken(token);
      saveToCookie({ accessToken: token, user: null });
      setState((prev) => ({
        ...prev,
        isSignedIn: true,
        isLoading: false,
        error: null,
        user: null,
      }));
    }
  }, []);

  // Handle login error
  const handleLoginError = useCallback(
    (error: { error_description?: string }) => {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.error_description || "Authentication failed",
      }));
    },
    []
  );

  // Google login hook
  const login = useGoogleLogin({
    scope: SCOPES,
    onSuccess: (response) => handleLoginSuccess(response.access_token),
    onError: handleLoginError,
  });

  // Sign in
  const signIn = useCallback(() => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    login();
  }, [login]);

  // Sign out
  const signOut = useCallback(() => {
    clearCookie();
    googleLogout();
    setAccessToken(null);
    setState(INITIAL_STATE);
  }, []);

  // Group events by date
  const eventsByDate = state.events.reduce<Record<string, CalendarEvent[]>>(
    (acc, event) => {
      const dateStr = event.start.date || event.start.dateTime?.split("T")[0];
      if (dateStr) {
        acc[dateStr] = acc[dateStr] || [];
        acc[dateStr].push(event);
      }
      return acc;
    },
    {}
  );

  return {
    // Auth
    isSignedIn: state.isSignedIn,
    isLoading: state.isLoading,
    error: state.error,
    user: state.user,
    signIn,
    signOut,
    // Calendar
    events: state.events,
    eventsByDate,
    isLoadingEvents: state.isLoadingEvents,
  };
}
