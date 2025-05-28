import { AddCircle, Delete } from "@mui/icons-material";
import {
  Alert,
  Box,
  IconButton,
  Snackbar,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { cratesIO } from "./utils";
import Cookies from "js-cookie";

const horizontalSX: SxProps<Theme> = {
  display: "flex",
  alignItems: "flex-end",
  gap: 1, // Add some space between items
};

const CRATES_COOKIE_NAME = "selected_crates";

// Get crates from cookie or use default values
const getCrates = (): Set<string> => {
  const savedCrates = Cookies.get(CRATES_COOKIE_NAME);
  if (savedCrates) {
    return new Set(JSON.parse(savedCrates));
  }
  return new Set(["axum", "serde", "tokio"]);
};

/**
 * Crate input form
 * @param onCrateChange - Callback function to pass the valid crates to the parent component
 */
export const InputCrate = ({
  onCrateChange,
}: {
  onCrateChange: (validCrates: string[]) => void;
}) => {
  const [crates, setCrates] = useState<Set<string>>(getCrates());
  const [candidateCrate, setCandidateCrate] = useState("");
  const [openErrorNotification, setOpenErrorNotification] = useState(false);
  const [invalidCrate, setInvalidCrate] = useState("");

  // Pass it to the parent component
  useEffect(() => {
    onCrateChange(Array.from(crates));
  }, [crates]);

  // Updates the crates state and the cookie
  const updateCrates = (newCrates: Set<string>) => {
    setCrates(newCrates);
    Cookies.set(CRATES_COOKIE_NAME, JSON.stringify(Array.from(newCrates)), {
      expires: 365,
    });
  };

  const handleSnackbarClose = () => {
    setInvalidCrate("");
    setOpenErrorNotification(false);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    cratesIO.api.crates
      .getCrate(candidateCrate)
      .then(() => updateCrates(new Set([...crates, candidateCrate])))
      .catch(() => {
        setInvalidCrate(candidateCrate);
        setOpenErrorNotification(true);
      });
    setCandidateCrate("");
  };

  return (
    <>
      {/* Crate input form */}
      <Box>
        <Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={horizontalSX}
          >
            <TextField
              value={candidateCrate}
              onChange={(e) => setCandidateCrate(e.target.value)}
              label="Crate"
              variant="standard"
            />
            <IconButton type="submit" aria-label="add" size="small">
              <AddCircle fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ marginTop: "20px" }}>
          {/* Display the crates along with a x button to delete it from the list */}
          {Array.from(crates).map((crate) => (
            <Box sx={horizontalSX} key={crate}>
              <IconButton
                onClick={() => {
                  const newCrates = new Set(crates);
                  newCrates.delete(crate);
                  updateCrates(newCrates);
                }}
                aria-label="delete"
                size="small"
              >
                <Delete fontSize="small" />
              </IconButton>
              <Typography>{crate}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Display an error notification if the crate is invalid */}
      <Snackbar
        open={openErrorNotification}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          Invalid crate given "{invalidCrate}"
        </Alert>
      </Snackbar>
    </>
  );
};
