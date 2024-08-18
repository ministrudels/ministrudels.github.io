import { Card, List, ListItem, Typography } from "@mui/material";
import { useGetLatestVersions } from "./utils";

export const LatestVersions = ({ crates }: { crates: string[] }) => {
  const { data } = useGetLatestVersions(crates);

  return (
    <Card sx={{ width: "100%", padding: 2 }}>
      <Typography variant="body1">Latest Version</Typography>
      <List>
        {crates.map((crate) => (
          <ListItem key={crate}>
            <Typography variant="caption">
              <code>
                {data[crate]} {crate}
              </code>
            </Typography>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
