import { Button, Typography, Box, CircularProgress, Avatar } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import "./GoogleAuthButton.css";

type GoogleAuthButtonProps = {
  isSignedIn: boolean;
  isLoading: boolean;
  error: string | null;
  user: {
    name: string;
    picture: string;
  } | null;
  onSignIn: () => void;
  onSignOut: () => void;
};

/**
 * GoogleAuthButton - Sign in/out button for Google authentication.
 */
export default function GoogleAuthButton({
  isSignedIn,
  isLoading,
  error,
  user,
  onSignIn,
  onSignOut,
}: GoogleAuthButtonProps) {
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

  if (isSignedIn) {
    return (
      <Box className="google-auth__user">
        {user?.picture && (
          <Avatar
            src={user.picture}
            alt={user.name}
            sx={{ width: 24, height: 24 }}
          />
        )}
        <Typography variant="caption" className="google-auth__name">
          {user?.name || "Connected"}
        </Typography>
        <Button size="small" onClick={onSignOut} variant="text">
          Disconnect
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
