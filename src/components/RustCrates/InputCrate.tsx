import { AddCircle } from "@mui/icons-material";
import {
  Alert,
  Box,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CrateLogo from "./cargo.png";
import { cratesIO } from "./utils";

export const InputCrate = ({
  onCrateChange,
}: {
  onCrateChange: (validCrates: string[]) => void;
}) => {
  const [crates, setCrates] = useState<Set<string>>(new Set(["sqlx"]));
  const [candidateCrate, setCandidateCrate] = useState("");
  const [openErrorNotification, setOpenErrorNotification] = useState(false);
  const [invalidCrate, setInvalidCrate] = useState("");

  // Pass it to the parent component
  useEffect(() => {
    onCrateChange(Array.from(crates));
  }, [crates]);

  const handleSnackbarClose = () => {
    setInvalidCrate("");
    setOpenErrorNotification(false);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    cratesIO.api.crates
      .getCrate(candidateCrate)
      .then(() => setCrates(new Set([...crates, candidateCrate])))
      .catch(() => {
        setInvalidCrate(candidateCrate);
        setOpenErrorNotification(true);
      });
    setCandidateCrate("");
  };

  return (
    <>
      {Array.from(crates).map((c) => (
        <Typography key={c}>{c}</Typography>
      ))}
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 1, // Add some space between items
        }}
      >
        <Box
          component="img"
          sx={{
            height: 25,
            width: 25,
          }}
          src={CrateLogo}
        />
        <TextField
          value={candidateCrate}
          onChange={(e) => setCandidateCrate(e.target.value)}
          label="Crate name"
          variant="standard"
        />
        <IconButton type="submit" aria-label="add" size="small">
          <AddCircle fontSize="small" />
        </IconButton>
      </Box>
      <Snackbar
        open={openErrorNotification}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          Invalid crate given "{invalidCrate}"
        </Alert>
      </Snackbar>
    </>
  );
};
