import { AddCircle } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import CrateLogo from "./cargo.png";

export const InputCrate = ({
  onSubmit,
}: {
  onSubmit: (lookup: string) => void;
}) => {
  const [crateName, setCrateName] = useState("");

  return (
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
        value={crateName}
        onChange={(e) => setCrateName(e.target.value)}
        label="Crate name"
        variant="standard"
      />
      <IconButton
        onClick={() => {
          onSubmit(crateName);
          setCrateName("");
        }}
        aria-label="add"
        size="small"
      >
        <AddCircle fontSize="small" />
      </IconButton>
    </Box>
  );
};
