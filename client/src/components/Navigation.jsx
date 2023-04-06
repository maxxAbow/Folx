import React, {useState} from 'react';
// import '../assets/css/Navigation.css';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select, 
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery
} from '@mui/material';

import {
  LocalPizza,
  LightMode,
  DarkMode,
  Search,
  FastFood,
  FoodBank,
  Message,
  Notifications,
  Help,
  Menu,
  Close
} from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from 'state';
import { useNavigate } from 'react-router-dom';
import FlexBetween from './style-components/FlexBetween';
// import { light } from '@mui/material/styles/createPalette';

const Navigation = () => {
  // State to determine to open up mobile menu on smaller/mobile screens
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  // To dispatch actions from reducers
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // To grab user information
  const user = useSelector((state) => state.user);
  // Hook to determine if current screensize to determine users screensize
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // Refers themes from theme js file
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const light = theme.palette.neutral.light;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  // const fullName = `${user.firstName} ${user.lastName}`
  const fullName = `Gordon Ramsay`

  return (
    // The Box component from @mui/material allows us to pass in CSS properties as component properties
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        {/* Logo will go here, but Typogrpahy Component is a placeholder for now */}
        <Typography 
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate('/home')}
          // Add 'sx' property to add psuedo CSS
          sx={{
            "&:hover" : {
              color: primaryLight,
              cursor: "pointer"
            }
          }}
        >
          Folx 
          <FoodBank sx={{ fontSize: 40 }}/>
        </Typography>
        {/* Setting condition for if Page is not on a mobile screen */}
        {isNonMobileScreens && (
          <FlexBetween 
            backgroundColor={neutralLight} 
            borderRadius="9px" 
            gap="3rem" 
            padding="0.1rem 1.5rem"
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
        <FlexBetween gap="2rem">
          {/* Use redux to change 'mode' state via buttons to Light or Dark mode */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px"}} />
            ): (<LightMode sx={{ color: dark, fontSize: "25px"}} />)}
          </IconButton>
          <Message sx={{ fontSize: "25px"}} />
          <Notifications sx={{ fontSize: "25px"}} />
          <Help sx={{ fontSize: "25px"}} />
          <FormControl variant='standard' value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                padding: "0.25rem 1rem",
                "& .MuiSvgIcon-root:": {
                  pr: "0.25rem",
                  width: "3rem"
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight
                }
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </ MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
      <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
        <Menu />
      </IconButton>)}
      {/* Mobile Nav */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* Close Icon */}
          <Box display="flex" justifyContent="flex-end" padding="1rem">
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
              <Close />
            </IconButton>
          </Box>

          {/* Menu Items */}
          <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="2rem">
          {/* Use redux to change 'mode' state via buttons to Light or Dark mode */}
          <IconButton
           onClick={() => dispatch(setMode())}
           sx={{ fontSize: "25px"}}
          >
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ color: light, fontSize: "25px"}} />
            ): <LightMode sx={{ color: dark, fontSize: "25px"}} />}
          </IconButton>
          <Message sx={{ fontSize: "25px"}} />
          <Notifications sx={{ fontSize: "25px"}} />
          <Help sx={{ fontSize: "25px"}} />
          <FormControl variant='standard' value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                padding: "0.25rem 1rem",
                "& .MuiSvgIcon-root:": {
                  pr: "0.25rem",
                  width: "3rem"
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight
                }
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </ MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  )
}
// const Navigation = () => {
//   return (
//     <Navbar collapseOnSelect expand='lg' bg='black' variant='dark' id='navbar'>
//       <Container>
//         <Navbar.Brand href='#home'>
//           FolX (But it'll be a logo here haha!)
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls='responsive-navbar-nav' />
//         {/* <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link href="#features">Features</Nav.Link>
//             <Nav.Link href="#pricing">Pricing</Nav.Link>
//             <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
//               <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.2">
//                 Another action
//               </NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action/3.4">
//                 Separated link
//               </NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//         </Navbar.Collapse> */}
//       </Container>
//     </Navbar>
//   );
// };

export default Navigation;
