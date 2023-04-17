import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import api from 'utils/API';
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import {
  // LocalPizza,
  LightMode,
  DarkMode,
  Search,
  // FastFood,
  FoodBank,
  Message,
  Notifications,
  Help,
  Menu,
  Close,
} from '@mui/icons-material';

import { useDispatch } from 'react-redux';
import { setMode } from 'state';
import { useNavigate } from 'react-router-dom';
import FlexBetween from './style-components/FlexBetween';
import '../assets/css/Navigation.css';

const Navigation = ({ userId, setIsAuth, user, setUser, isProfilePage, isFinishedApp=false }) => {
  // State to determine to open up mobile menu on smaller/mobile screens
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  document.body.style.paddingTop = '80px';

  // To dispatch action from reducers to change mode's state
  const dispatch = useDispatch();
  // To reroute page
  const navigate = useNavigate();

  // Hook to determine if current screensize to determine users screensize
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  const [username, setUsername] = useState('');

  // Refers themes from theme js file
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const light = theme.palette.neutral.light;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  // Removes the activeUser Object from localStorage,
  // then sets isAuth state to false so that it automatically rerenders the App.js, which routes the user back to the login page
  const logOut = () => {
    localStorage.removeItem('activeUser');
    setIsAuth(false);
    if (!isProfilePage) {
      setUser(null);
    }
    navigate('/');
  };

  const returnHome = () => {
    navigate('/home');
    // This value causes the scrolling to occur immediately, without any animation or smoothing.
    window.scrollTo({ top: 0, behavior: 'instant' });
    // This value causes the scrolling to occur with a smooth animation, making it appear more gradual and controlled.
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const searchUser = async (userId) => {
    const response = await api.getUserById(userId);
    setUsername(response.data.username);
  };

  useEffect(() => {
    searchUser(userId);
  }, []);

  return (
    // The Box component from @mui/material allows us to pass in CSS properties as component properties
    <FlexBetween padding='1rem 6%' backgroundColor={alt} className='navbar'>
      <FlexBetween gap='1.75rem'>
        {/* Logo will go here, but Typogrpahy Component is a placeholder for now */}
        <Typography
          display='flex'
          fontWeight='bold'
          fontSize='clamp(1rem, 2rem, 2.25rem)'
          color='primary'
          onClick={() => returnHome()}
          // Add 'sx' property to add psuedo CSS
          sx={{
            '&:hover': {
              color: primaryLight,
              cursor: 'pointer',
            },
          }}
        >
          <img
            src='../assets/images/logos/folx-1.png'
            alt='Folx logo'
            style={{ height: '48px', width: 'fit-content' }}
          />
        </Typography>
        {/* Setting condition for if Page is not on a mobile screen */}
        {isNonMobileScreens || isFinishedApp && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius='9px'
            gap='3rem'
            padding='0.1rem 1.5rem'
          >
            <InputBase placeholder='Search...' />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {/* Desktop Nav */}
      {isNonMobileScreens ? (
        <FlexBetween gap='2rem'>
          {/* Use redux to change 'mode' state via buttons to Light or Dark mode */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkMode sx={{ fontSize: '25px' }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: '25px' }} />
            )}
          </IconButton>
          {isFinishedApp && (
            <>
            <Message sx={{ fontSize: '25px' }} />
            <Notifications sx={{ fontSize: '25px' }} />
            <Help sx={{ fontSize: '25px' }} />
            </>
          )}
          <FormControl variant='standard' value={username}>
            <Select
              value={username}
              sx={{
                backgroundColor: neutralLight,
                width: '150px',
                borderRadius: '0.25rem',
                padding: '0.25rem 1rem',
                '& .MuiSvgIcon-root:': {
                  pr: '0.25rem',
                  width: '3rem',
                },
                '& .MuiSelect-select:focus': {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={username}>
                <Typography>{username}</Typography>
              </MenuItem>
              <MenuItem onClick={() => logOut()}>Log Out</MenuItem>
            </Select>
          </FormControl>
          <svg
            className='editorial'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            viewBox='0 24 150 28'
            preserveAspectRatio='none'
          >
            <defs>
              <path
                id='gentle-wave'
                d='M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z'
              />
            </defs>
            <g className='parallax1'>
              <use xlinkHref='#gentle-wave' x='50' y='3' fill='#F8D858' />
            </g>
            <g className='parallax2'>
              <use xlinkHref='#gentle-wave' x='50' y='0' fill='#C8CF90' />
            </g>
            <g className='parallax3'>
              <use xlinkHref='#gentle-wave' x='50' y='9' fill='#EE8636' />
            </g>
            <g className='parallax4'>
              <use xlinkHref='#gentle-wave' x='50' y='6' fill='#E93E44' />
            </g>
          </svg>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}
      {/* Mobile Nav */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position='fixed'
          right='0'
          bottom='0'
          height='100%'
          zIndex='10'
          maxWidth='500px'
          minWidth='300px'
          backgroundColor={background}
        >
          {/* Close Icon */}
          <Box display='flex' justifyContent='flex-end' padding='1rem'>
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Menu Items */}
          <FlexBetween
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            gap='2rem'
          >
            {/* Use redux to change 'mode' state via buttons to Light or Dark mode */}
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: '25px' }}
            >
              {theme.palette.mode === 'dark' ? (
                <DarkMode sx={{ color: light, fontSize: '25px' }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: '25px' }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: '25px' }} />
            <Notifications sx={{ fontSize: '25px' }} />
            <Help sx={{ fontSize: '25px' }} />
            <FormControl variant='standard' value={username}>
              <Select
                value={username}
                sx={{
                  backgroundColor: neutralLight,
                  width: '150px',
                  borderRadius: '0.25rem',
                  padding: '0.25rem 1rem',
                  '& .MuiSvgIcon-root:': {
                    pr: '0.25rem',
                    width: '3rem',
                  },
                  '& .MuiSelect-select:focus': {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={username}>
                  <Typography>{username}</Typography>
                </MenuItem>
                <MenuItem onClick={() => logOut()}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navigation;
