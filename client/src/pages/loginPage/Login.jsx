import React, { Suspense, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Canvas } from '@react-three/fiber';
import '../../assets/css/Login.css';
import '../../assets/css/Animations.css';
import Earth from '../../components/Earth';
import Form from '../../components/Form';

const Login = () => {
  const [login, setLogin] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  // Randomly generates a number that represents an index in the array returned by the images
  const hideImg = () => {
    const imgArray = document.querySelectorAll('.space-food');

    // If the array's length is 0, it will not continue the function
    if (imgArray.length === 0) {
      return;
    }

    // Selects the audio tag and plays the sound clip
    const myAudio = document.getElementById('myAudio');
    myAudio.play();

    // Randomly generates a number that's between 0 and the length of the array
    let i = Math.floor(Math.random() * imgArray.length);

    // Uses the random number to remove an element from the DOM based of the index.
    imgArray[i].remove();
  };

  return (
    <Row>
      <Col>
        <div className='container3D'>
          <div className='flier'>
            <img
              className='space-food'
              id='image1'
              src='/assets/images/pizza.png'
              alt='floating pizza'
            />
            <img
              className='space-food'
              id='image2'
              src='/assets/images/turkey.png'
              alt='floating turkey'
            />
            <img
              className='space-food'
              id='image3'
              src='/assets/images/sushi.png'
              alt='floating sushi'
            />
            <img
              className='space-food'
              id='image4'
              src='/assets/images/ice-cream.png'
              alt='floating ice cream'
            />
            <img
              className='space-food'
              id='image5'
              src='/assets/images/cake.png'
              alt='floating cake'
            />
            <img
              className='space-food'
              id='image6'
              src='/assets/images/chinese-food.png'
              alt='floating chinese takeout'
            />
            <img
              className='space-food'
              id='image7'
              src='/assets/images/fried-chicken.png'
              alt='floating fried chicken'
            />
            <img
              className='space-food'
              id='image8'
              src='/assets/images/fries.png'
              alt='floating fries'
            />
          </div>
          <Row className='middle'>
            <Col>
              <img
                className='astro bounce-2'
                src='/assets/images/astronaut-flipped.png'
                alt='A bouncing astronaut'
                onClick={() => hideImg()}
              />
            </Col>
            <Col
              className='col-lg-5 col-md-7 p-0 form-container'
              style={{ width: '25%', position: 'relative', zIndex: '1' }}
            >
              <Form 
                login={login} 
                setLogin={setLogin} 
                isAuth={isAuth}
                setIsAuth={setIsAuth}
              />
            </Col>
            <Col xs lg='5' style={{ height: '100vh', padding: 0 }}>
              <Canvas>
                <Suspense fallback={null}>
                  <Earth />
                </Suspense>
              </Canvas>
            </Col>
          </Row>
        </div>
        <audio id='myAudio' style={{ display: 'none' }}>
          <source src='/assets/audio/apple_bite.wav' type='audio/wav' />
        </audio>
      </Col>
    </Row>
  );
};

export default Login;
