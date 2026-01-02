import { useState, useCallback } from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import Cookies from "js-cookie";

// =============================================================================
// Types
// =============================================================================

type User = {
  name: string;
  picture: string;
};

type AuthState = {
  isSignedIn: boolean;
  isLoading: boolean;
  error: string | null;
  accessToken: string | null;
  user: User | null;
};

// =============================================================================
// Constants
// =============================================================================

const COOKIE_NAME = "google_calendar_auth";
const COOKIE_EXPIRY_DAYS = 1;

const SCOPES = [
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/userinfo.profile",
].join(" ");

const INITIAL_STATE: AuthState = {
  isSignedIn: false,
  isLoading: false,
  error: null,
  accessToken: null,
  user: null,
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
  Cookies.set(COOKIE_NAME, JSON.stringify(auth), { expires: COOKIE_EXPIRY_DAYS });
}

function clearCookie(): void {
  Cookies.remove(COOKIE_NAME);
}

// =============================================================================
// Google API
// =============================================================================

async function fetchGoogleUserInfo(accessToken: string): Promise<User> {
  const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }

  const data = await response.json();
  return {
    name: data.name,
    picture: data.picture,
  };
}

// =============================================================================
// Hook
// =============================================================================

export function useGoogleAuth() {
  const stored = loadFromCookie();

  const [state, setState] = useState<AuthState>(
    stored
      ? { ...INITIAL_STATE, isSignedIn: true, accessToken: stored.accessToken, user: stored.user }
      : INITIAL_STATE
  );

  const handleLoginSuccess = useCallback(async (accessToken: string) => {
    try {
      const user = await fetchGoogleUserInfo(accessToken);
      console.log("Google User:", user.name);

      saveToCookie({ accessToken, user });
      setState({ isSignedIn: true, isLoading: false, error: null, accessToken, user });
    } catch {
      saveToCookie({ accessToken, user: null });
      setState({ isSignedIn: true, isLoading: false, error: null, accessToken, user: null });
    }
  }, []);

  const handleLoginError = useCallback((error: { error_description?: string }) => {
    setState((prev) => ({
      ...prev,
      isLoading: false,
      error: error.error_description || "Authentication failed",
    }));
  }, []);

  const login = useGoogleLogin({
    scope: SCOPES,
    onSuccess: (response) => handleLoginSuccess(response.access_token),
    onError: handleLoginError,
  });

  const signIn = useCallback(() => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    login();
  }, [login]);

  const signOut = useCallback(() => {
    clearCookie();
    googleLogout();
    setState(INITIAL_STATE);
  }, []);

  return {
    ...state,
    signIn,
    signOut,
  };
}
