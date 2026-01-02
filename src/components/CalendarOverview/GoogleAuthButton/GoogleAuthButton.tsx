import { Button, Avatar, Typography, Box, CircularProgress } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import "./GoogleAuthButton.css";

type GoogleAuthButtonProps = {
  isSignedIn: boolean;
  isLoading: boolean;
  isConfigured: boolean;
  error: string | null;
  user: {
    name: string;
    email: string;
    picture: string;
  } | null;
  onSignIn: () => void;
  onSignOut: () => void;
};

/**
 * GoogleAuthButton - Sign in/out button for Google authentication.
 *
 * Shows:
 * - Sign in button when not authenticated
 * - User info and sign out button when authenticated
 * - Loading state during authentication
 * - Error message if configuration is missing
 */
export default function GoogleAuthButton({
  isSignedIn,
  isLoading,
  isConfigured,
  error,
  user,
  onSignIn,
  onSignOut,
}: GoogleAuthButtonProps) {
  if (!isConfigured) {
    return (
      <Typography variant="caption" color="textSecondary" className="google-auth__error">
        Google Calendar not configured
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="caption" color="error" className="google-auth__error">
        {error}
      </Typography>
    );
  }

  if (isLoading) {
    return (
      <Box className="google-auth__loading">
        <CircularProgress size={20} />
      </Box>
    );
  }

  if (isSignedIn && user) {
    return (
      <Box className="google-auth__user">
        <Avatar
          src={user.picture}
          alt={user.name}
          className="google-auth__avatar"
          sx={{ width: 24, height: 24 }}
        />
        <Typography variant="caption" className="google-auth__name">
          {user.name}
        </Typography>
        <Button size="small" onClick={onSignOut} variant="text">
          Sign out
        </Button>
      </Box>
    );
  }

  return (
    <Button
      size="small"
      variant="outlined"
      startIcon={<GoogleIcon />}
      onClick={onSignIn}
      className="google-auth__signin"
    >
      Connect Calendar
    </Button>
  );
}
