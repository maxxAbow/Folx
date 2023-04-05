import React, { useMemo } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Login from 'pages/loginPage/Login';
import Home from 'pages/homePage/Home';
import Profile from 'pages/profilePage/Profile';
import Navigation from './components/Navigation';
import Starfield from './components/Starfield';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from "@mui/material/styles";
import { themeSettings } from './theme';

import './assets/css/App.css';

function App() {
  const mode = useSelector((state) => state.mode);
  return (
    <Container fluid className='p-0 app'>
      <Navigation />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile/:userId' element={<Profile />} />
      </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
