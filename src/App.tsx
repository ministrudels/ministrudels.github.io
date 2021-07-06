import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Sandbox from './components/Sandbox';

const sections = [
  { title: 'Home', url: '/home' },
  { title: 'Sandbox', url: '/sandbox' }
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
              <Route path='/home' component={Home} />
              <Route path='/sandbox' component={Sandbox} />
               <Route path='/' component={Home} />
            </Switch>
          </Router>
        </main>
      </Container>
      <Footer />
    </>
  );
}
