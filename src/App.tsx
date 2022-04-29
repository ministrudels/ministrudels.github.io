import { Container, CssBaseline } from "@mui/material";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Studio from "./components/Studio";

const sections = [
  { title: "Home", url: "/home" },
  { title: "Studio", url: "/studio" },
];

export default function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Header sections={sections} />
        <main>
          <Router basename={process.env.PUBLIC_URL}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/Studio" component={Studio} />
              <Route path="/" component={Home} />
            </Switch>
          </Router>
        </main>
      </Container>
      <Footer />
    </>
  );
}
