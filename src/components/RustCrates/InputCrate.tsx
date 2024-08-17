import { AddCircle } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CrateLogo from "./cargo.png";

export const InputCrate = ({
  onCrateChange,
}: {
  onCrateChange: (validCrates: string[]) => void;
}) => {
  const [crates, setCrates] = useState<Set<string>>(new Set(["sqlx"]));
  const [candidateCrate, setCandidateCrate] = useState("");

  // Pass it to the parent component
  useEffect(() => {
    onCrateChange(Array.from(crates));
  }, [crates, onCrateChange]);

  return (
    <>
      {Array.from(crates).map((c) => (
        <Typography key={c}>{c}</Typography>
      ))}
      <Box
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
        <IconButton
          onClick={() => {
            // TODO: Check if the crate exists
            setCrates(new Set([...crates, candidateCrate]));
            setCandidateCrate("");
          }}
          aria-label="add"
          size="small"
        >
          <AddCircle fontSize="small" />
        </IconButton>
      </Box>
    </>
  );
};
