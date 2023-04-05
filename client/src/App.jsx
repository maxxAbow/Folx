import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Login from 'pages/loginPage/Login';
import Navigation from './components/Navigation';
import Starfield from './components/Starfield';

import './assets/css/App.css';

function App() {
  return (
    <Container fluid className='p-0 app'>
      <Navigation />
      <Login />
    </Container>
  );
}

export default App;
