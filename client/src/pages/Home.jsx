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

  return (
    <Row>
    <Col > 
        <div className='container3D'>
        <div class="flier">
            <img id='image1' src='/assets/images/pizza.png' alt='floating pizza' />
            <img id='image2' src='/assets/images/turkey.png' alt='floating turkey' />
            <img id='image3' src='/assets/images/sushi.png' alt='floating sushi' />
            <img id='image4' src='/assets/images/ice-cream.png' alt='floating ice cream' />
            <img id='image5' src='/assets/images/cake.png' alt='floating cake' />
            <img id='image6' src='/assets/images/chinese-food.png' alt='floating chinese takeout' />
            <img id='image7' src='/assets/images/fried-chicken.png' alt='floating fried chicken' />
            <img id='image8' src='/assets/images/fries.png' alt='floating fries' />
        </div>
            <Row className='middle'>
                <Col>
                    <img className='astro bounce-2' src='../assets/images/astronaut-flipped.png' alt='A bouncing astronaut' />
                </Col>
                <Col className="col-lg-5 col-md-7 p-0 form-container" style={{width: '25%', position: 'relative', zIndex: '1'}}>
                </Col>
                <Col xs lg="5" style={{ height: '100vh', padding: 0}} >
             
                </Col>
            </Row>
            
        </div>
    </Col> 
</Row>
  )
};

export default Home;
