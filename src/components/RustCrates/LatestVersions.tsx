import { Card, Grid, List, ListItem, Typography } from "@mui/material";
import { ScaleOrdinal } from "d3";
import { useCratesLatestVersions } from "./hooks";

export const LatestVersions = ({
  crates,
  colourScale,
}: {
  crates: string[];
  colourScale: ScaleOrdinal<string, string, never>;
}) => {
  const data = useCratesLatestVersions(crates);

  return (
    <Card sx={{ width: "100%", padding: 2 }}>
      <Typography variant="body1">Latest Version</Typography>
      <Grid container>
        <Grid item>
          <List>
            {crates.map((crate) => (
              <ListItem key={crate}>
                <Typography variant="caption">
                  <code>{data[crate]}</code>
                </Typography>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item>
          <List>
            {crates.map((crate) => (
              <ListItem key={crate}>
                <Typography
                  sx={{ color: colourScale(crate) }}
                  variant="caption"
                >
                  {crate}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Card>
  );
};
