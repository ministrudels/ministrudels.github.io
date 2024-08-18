import { Card, Grid, List, ListItem, Typography } from "@mui/material";
import { getColourScale } from "../../utils";
import { useGetLatestVersions } from "./utils";

export const LatestVersions = ({ crates }: { crates: string[] }) => {
  const { data } = useGetLatestVersions(crates);
  const scale = getColourScale(crates.length);

  return (
    <Card sx={{ width: "100%", padding: 2 }}>
      <Typography variant="body1">Latest Version</Typography>
      <Grid container>
        <Grid item xs={4}>
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
            {crates.map((crate, i) => (
              <ListItem key={crate}>
                <Typography sx={{ color: scale(i) }} variant="caption">
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
