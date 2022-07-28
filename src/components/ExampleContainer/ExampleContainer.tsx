import {
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";

import { ReactNode } from "react";

type Props = {
  title: string;
  date: Date;
  description?: string;
  children: ReactNode;
  tags?: Array<string>;
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(date);
};

export default function ExampleContainer(props: Props) {
  const { title, date, tags, children } = props;
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container justifyContent={"space-between"} spacing={2}>
          <Grid item>
            <Typography gutterBottom variant="h5">
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="textSecondary">{formatDate(date)}</Typography>
          </Grid>
        </Grid>
        {children}
      </CardContent>
      <CardActions>
        {tags?.map((x) => (
          <Chip key={x} label={x} />
        ))}
      </CardActions>
    </Card>
  );
}
