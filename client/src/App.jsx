import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Login from 'pages/loginPage/Login';
import Home from 'pages/homePage/Home';
import Profile from 'pages/profilePage/Profile';
// import Navigation from './components/Navigation';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from "@mui/material/styles";
import { themeSettings } from './theme';
import './assets/css/App.css';

// Grabs the login information if Login is successful

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  
  const activeUserStorage = localStorage.getItem("activeUser");// Retrieves activerUsers data from local storage
  const activeUser = JSON.parse(activeUserStorage); // parses the string into a JS object

  // Always sets the initial value of isAuth to be true or false, by checking if activeUser object is in data base
  // and if the activeUser's second value is true
  const [isAuth, setIsAuth] = useState(activeUser && activeUser[1] === true ? true : false);
  const [profileId, setProfileId] = useState("");

useEffect(()=> {
  // Check if activeUser exist, and if so confirms if they are logged in
    if (!activeUser || activeUser[1] !== true) {
      setIsAuth(false);
    } else if (activeUser[1] === true) {
      setIsAuth(true) // if logged in, isAuth = true
    }

}, [])

  return (
    <Container fluid className='p-0 app'>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={isAuth === false ? <Login isAuth={isAuth} setIsAuth={setIsAuth}/> : <Navigate to={"/home"} />} />
        {/* If isAuth is not equal to True, then user will be routed to login page */}
        <Route path='/home' element={isAuth ? <Home setIsAuth={setIsAuth} profileId={profileId} setProfileId={setProfileId}/> : <Navigate to="/" />} />
        {/* <Route path='/profile/:userId' element={isAuth ? <Profile /> : <Navigate to="/" />} /> */}
        <Route path='/profile/:userId' element={isAuth ? <Profile profileId={profileId} setProfileId={setProfileId} /> : <Navigate to="/" />} />
      </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </Container>
  );
}

export default App;
