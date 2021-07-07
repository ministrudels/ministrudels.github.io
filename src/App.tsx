import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Studio from './components/Studio';

const sections = [
  { title: 'Home', url: '/home' },
  { title: 'Studio', url: '/studio' }
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
              <Route path='/Studio' component={Studio} />
               <Route path='/' component={Home} />
            </Switch>
          </Router>
        </main>
      </Container>
      <Footer />
    </>
  );
}
