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

// Grabs the login information if Login is successful
// const isAuth = Boolean(useSelector((state) => state.token))
const isAuth = true;

import './assets/css/App.css';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <Container fluid className='p-0 app'>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Navigation /> */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={isAuth ? <Home /> : <Navigate to="/" />} />
        <Route path='/profile/:userId' element={isAuth ? <Profile /> : <Navigate to="/" />} />
      </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </Container>
  );
}

export default App;
