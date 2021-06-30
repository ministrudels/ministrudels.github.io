import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './Home.js'
import Projects from './Projects.js'
import Mylearningspace from './Mylearningspace.js'
import Container from '@material-ui/core/Container';

import Header from './Header';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  { title: 'Home', url: '/home' },
  { title: 'Projects', url: '/projects' },
  { title: 'My Learning Space', url: '/mylearningspace' },
  { title: 'About', url: '/about' }
];


export default function App() {
  const classes = useStyles();

  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="md">
        <Header sections={sections} />
        <main>
          <Switch>
            <Route exact path='/home' component={Home}/>
            <Route exact path='/projects' component={Projects}/>
            <Route exact path='/mylearningspace' component={Mylearningspace}/>
            <Route exact path='/about' component={Mylearningspace}/>
            <Route path='/' component={Home}/>
          </Switch>
        </main>
      </Container>
      <Footer />
    </Router>
  );
}
