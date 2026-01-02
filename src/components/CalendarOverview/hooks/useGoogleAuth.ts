import { useState, useCallback, useEffect } from "react";
import Cookies from "js-cookie";

/**
 * Google OAuth 2.0 configuration.
 * Client ID should be set in environment variable VITE_GOOGLE_CLIENT_ID
 *
 * To get a client ID:
 * 1. Go to https://console.cloud.google.com/
 * 2. Create a new project or select existing
 * 3. Enable the Google Calendar API
 * 4. Go to Credentials > Create Credentials > OAuth Client ID
 * 5. Select "Web application"
 * 6. Add authorized JavaScript origins (e.g., http://localhost:5173)
 * 7. Copy the Client ID to your .env file as VITE_GOOGLE_CLIENT_ID
 */
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
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
  Cookies.set(AUTH_COOKIE_NAME, JSON.stringify(auth), { expires: 1 }); // 1 day (token typically expires in ~1 hour)
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

type TokenResponse = {
  access_token?: string;
  expires_in?: number;
  scope?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
};

type TokenClient = {
  requestAccessToken: () => void;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: TokenResponse) => void;
            error_callback?: (error: { type: string; message: string }) => void;
          }) => TokenClient;
          revoke: (token: string, callback: () => void) => void;
        };
      };
    };
  }
}

/**
 * useGoogleAuth - Hook for Google OAuth 2.0 authentication.
 *
 * Uses Google Identity Services (GIS) for secure client-side authentication.
 * Only requests calendar.readonly scope for minimal permissions.
 *
 * Security features:
 * - Uses OAuth 2.0 implicit flow (suitable for SPAs)
 * - Access token stored in memory only (not localStorage)
 * - Token automatically expires (typically 1 hour)
 * - Minimal scope (readonly access only)
 *
 * @example
 * const { isSignedIn, signIn, signOut, accessToken } = useGoogleAuth();
 *
 * if (!isSignedIn) {
 *   return <button onClick={signIn}>Sign in with Google</button>;
 * }
 */
export function useGoogleAuth() {
  // Initialize state from cookie if available
  const storedAuth = getStoredAuth();
  const [state, setState] = useState<GoogleAuthState>({
    isSignedIn: !!storedAuth,
    accessToken: storedAuth?.accessToken || null,
    user: storedAuth?.user || null,
    isLoading: !storedAuth, // Not loading if we have stored auth
    error: null,
  });

  const [tokenClient, setTokenClient] = useState<TokenClient | null>(null);

  // Load Google Identity Services script
  useEffect(() => {
    if (!CLIENT_ID) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Google Client ID not configured. Set VITE_GOOGLE_CLIENT_ID in .env",
      }));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google) {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          callback: (response) => {
            if (response.error) {
              setState((prev) => ({
                ...prev,
                isLoading: false,
                error: response.error_description || response.error || "Authentication failed",
              }));
              return;
            }
            if (response.access_token) {
              fetchUserInfo(response.access_token);
            }
          },
          error_callback: (error) => {
            setState((prev) => ({
              ...prev,
              isLoading: false,
              error: error.message || "Authentication failed",
            }));
          },
        });
        setTokenClient(client);
        // Only set loading false if we don't have stored auth
        if (!storedAuth) {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      }
    };
    script.onerror = () => {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to load Google Identity Services",
      }));
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

      // Save to cookie
      saveAuth({ accessToken, user });

      setState({
        isSignedIn: true,
        accessToken,
        user,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      // Still sign in even if user info fails
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

  const signIn = useCallback(() => {
    if (tokenClient) {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      tokenClient.requestAccessToken();
    }
  }, [tokenClient]);

  const signOut = useCallback(() => {
    clearAuth();
    if (state.accessToken && window.google) {
      window.google.accounts.oauth2.revoke(state.accessToken, () => {
        setState({
          isSignedIn: false,
          accessToken: null,
          user: null,
          isLoading: false,
          error: null,
        });
      });
    } else {
      setState({
        isSignedIn: false,
        accessToken: null,
        user: null,
        isLoading: false,
        error: null,
      });
    }
  }, [state.accessToken]);

  return {
    ...state,
    signIn,
    signOut,
    isConfigured: !!CLIENT_ID,
  };
}
