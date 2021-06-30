import React from 'react';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Header from './Header';
import Footer from './Footer';
import Home from './Home.js'
import Projects from './Projects.js'
import Mylearningspace from './Mylearningspace.js'

const sections = [
  { title: 'Home', url: '/home' },
  { title: 'Projects', url: '/projects' },
  { title: 'My Learning Space', url: '/mylearningspace' },
  // { title: 'About', url: '/about' }
];


export default function App() {

  console.log("This is the process.env", process.env.PUBLIC_URL)

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Header sections={sections} />
        <main>
          <Router basename={process.env.PUBLIC_URL}>
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/projects' component={Projects} />
              <Route path='/mylearningspace' component={Mylearningspace} />
              <Route path='/' component={Home} />
            </Switch>
          </Router>
        </main>
      </Container>
      <Footer />
    </>
  );
}
