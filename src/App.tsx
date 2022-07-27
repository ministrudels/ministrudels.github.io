import './App.css';

import { Container, CssBaseline } from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Studio from './components/Studio';

const sections = [
  { title: 'Home', url: '/home' },
  { title: 'Studio', url: '/studio' },
];

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth='md'>
        <Header sections={sections} />
        <main style={{ textAlign: 'center' }}>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/studio' element={<Studio />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </main>
      </Container>
      <Footer />
    </>
  );
}

export default App;
