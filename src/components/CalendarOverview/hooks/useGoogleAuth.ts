import { useState, useCallback } from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import Cookies from "js-cookie";

const SCOPES = [
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/userinfo.profile",
].join(" ");

const AUTH_COOKIE_NAME = "google_calendar_auth";

type StoredAuth = {
  accessToken: string;
  user: {
    name: string;
    picture: string;
  } | null;
};

const getStoredAuth = (): StoredAuth | null => {
  const saved = Cookies.get(AUTH_COOKIE_NAME);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }
  return null;
};

const saveAuth = (auth: StoredAuth) => {
  Cookies.set(AUTH_COOKIE_NAME, JSON.stringify(auth), { expires: 1 });
};

const clearAuth = () => {
  Cookies.remove(AUTH_COOKIE_NAME);
};

type GoogleAuthState = {
  isSignedIn: boolean;
  accessToken: string | null;
  user: {
    name: string;
    picture: string;
  } | null;
  isLoading: boolean;
  error: string | null;
};

/**
 * useGoogleAuth - Hook for Google OAuth 2.0 authentication.
 *
 * Uses @react-oauth/google for secure client-side authentication.
 * Requires GoogleOAuthProvider wrapper in the app.
 *
 * @example
 * const { isSignedIn, signIn, signOut, accessToken } = useGoogleAuth();
 */
export function useGoogleAuth() {
  const storedAuth = getStoredAuth();
  const [state, setState] = useState<GoogleAuthState>({
    isSignedIn: !!storedAuth,
    accessToken: storedAuth?.accessToken || null,
    user: storedAuth?.user || null,
    isLoading: false,
    error: null,
  });

  const fetchUserInfo = async (accessToken: string) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }

      const data = await response.json();
      const user = {
        name: data.name,
        picture: data.picture,
      };

      console.log("=== Google User ===");
      console.log("Name:", user.name);

      saveAuth({ accessToken, user });

      setState({
        isSignedIn: true,
        accessToken,
        user,
        isLoading: false,
        error: null,
      });
    } catch {
      saveAuth({ accessToken, user: null });
      setState({
        isSignedIn: true,
        accessToken,
        user: null,
        isLoading: false,
        error: null,
      });
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      fetchUserInfo(tokenResponse.access_token);
    },
    onError: (error) => {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.error_description || "Authentication failed",
      }));
    },
    scope: SCOPES,
  });

  const signIn = useCallback(() => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    login();
  }, [login]);

  const signOut = useCallback(() => {
    clearAuth();
    googleLogout();
    setState({
      isSignedIn: false,
      accessToken: null,
      user: null,
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    signIn,
    signOut,
    isConfigured: true,
  };
}
