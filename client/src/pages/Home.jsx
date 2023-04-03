import React, {Suspense, useState} from 'react'
import { Row, Col} from 'react-bootstrap'
import { Canvas } from '@react-three/fiber'
import '../assets/css/Home.css'
import '../assets/css/Animations.css'
// import '../js/Home.js'
import Earth from '../components/Earth';
import Login from '../components/Login'

const Home = () => {
  
  const [login, setLogin] = useState(true);

  return <div>Home</div>;
};

export default Home;
