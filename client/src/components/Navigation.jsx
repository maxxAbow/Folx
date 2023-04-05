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
  return (
    <Navbar collapseOnSelect expand='lg' bg='black' variant='dark' id='navbar'>
      <Container>
        <Navbar.Brand href='#home'>
          FolX (But it'll be a logo here haha!)
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        {/* <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
};

export default Navigation;
