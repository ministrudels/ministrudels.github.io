import { Container, Link, Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit">Huan Min Gan</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "10vh",
        å,
      }}
    >
      <footer
        style={{
          padding: "3rem 2rem",
          marginTop: "auto",
          backgroundColor: "white",
        }}
      >
        <Container maxWidth="md">
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
