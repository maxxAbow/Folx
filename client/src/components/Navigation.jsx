import React, {useState} from 'react';
import '../assets/css/Navigation.css';
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

const Navigation = () => {
  // State to determine to open up mobile menu on smaller/mobile screens
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  // To dispatch actions from reducers
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // To grab user information
  const user = useSelector((state) => state.user);
  // Hook to determine if current screensize to determine users screensize
  const isNonMobileScreensScreens = useMediaQuery("(min-width: 1000px)");

  // Refers themes from theme js file
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  // const fullName = `${user.firstName} ${user.lastName}`

  return (
    // The Box component from @mui/material allows us to pass in CSS properties as component properties
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        {/* Logo will go here, but Typogrpahy Component is a placeholder for now */}
        <Typography 
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onclick={() => navigate('/home')}
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
        {isNonMobileScreensScreens && (
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
