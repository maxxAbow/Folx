import React from 'react';
import { Container } from 'react-bootstrap';
import Home from './pages/homePage/Home';
import Navigation from './components/Navigation';
import Starfield from './components/Starfield';

import './assets/css/App.css';

function App() {
  return (
    <Container fluid className='p-0 app'>
      <Navigation />
      <Home />
    </Container>
  );
}

export default App;
