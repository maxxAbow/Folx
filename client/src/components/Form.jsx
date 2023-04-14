import React, { useEffect, useState } from 'react';
import api from 'utils/API';
import { BiLogInCircle } from 'react-icons/bi';
import { RiAccountPinBoxFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const Form = ({ login, setLogin, isAuth, setIsAuth }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const activeUser = [];
  // data.session.loggedIn
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    const authUser = await api.login(values);
    if (!authUser) {
      alert('Email and or Password is incorrect');
    }
    const userData = authUser.data;
    // console.log(userData);
    if (userData.session.loggedIn === true) {
      setIsAuth(true);
    }

    for (let key in userData.session) {
      if (key === 'userId' || key === 'loggedIn') {
        activeUser.push(userData.session[key]);
      }
    }
    activeUser.push(userData.user.userImage)
    localStorage.setItem('activeUser', JSON.stringify(activeUser));
    navigate('/home');
  };

  // useEffect(()=> {
  //   // Check if activeUser exist, and if so confirms if they are logged in
  //     console.log(`Form.js component ${isAuth}`)
  
  // }, [])
  return (
    <>
      <div
        className='form-box p-md-5'
        id='signinForm'
        style={{ display: login ? 'block' : 'none' }}
      >
        <div className='form-title'>
          <div className='text-center mb-3 loginIcon'>
            <BiLogInCircle size={52} />
          </div>
          <h2 className='fw-bold mb-4 text-center mt-2'>Sign In</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='form-floating mb-3'>
            <input
              type='email'
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className='form-control form-control-sm emailInput border-0'
              placeholder='Email'
            />
            <label htmlFor='floatingInput' className='text-center'>
              Email
            </label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='password'
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className='form-control form-control-sm passwordInput border-0'
              placeholder='Password'
            />
            <label htmlFor='floatingPassword' className='text-center'>
              Password
            </label>
          </div>
          <div className='mt-3 text-center d-grid'>
            <button
              id='signInButton'
              className='btn text-center mt-1 fw-semibold'
            >
              Sign In
            </button>
          </div>
        </form>
        <div className='mt-4 text-center'>
          <span>Don't have an account? </span>
          <button
            className='p-0 border-0 bg-transparent primaryColor'
            id='showSignup'
            onClick={() => setLogin(!login)}
          >
            Sign Up
          </button>
        </div>
      </div>
      <div
        className='form-box p-md-5'
        id='signupForm'
        style={{ display: !login ? 'block' : 'none' }}
      >
        <div className='form-title'>
          <div className='text-center mb-3 loginIcon'>
            <RiAccountPinBoxFill size={50} />
          </div>
          <h2 className='fw-bold mb-4 text-center mt-2'>Sign Up</h2>
        </div>
        <form action=''>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control form-control-sm border-0'
              id='display-name-input'
              placeholder='Username'
            />
            <label htmlFor='floatingInput' className='text-center'>
              Username
            </label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='email'
              className='form-control form-control-sm emailInput border-0'
              placeholder='Email'
            />
            <label htmlFor=' floatingInput' className='text-center'>
              Email
            </label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='password'
              className='form-control form-control-sm passwordInput border-0'
              placeholder='Password'
            />
            <label htmlFor='floatingPassword' className='text-center'>
              Password
            </label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control form-control-sm border-0'
              id='location-input'
              placeholder='Location'
            />
            <label htmlFor='floatingInput' className='text-center'>
              Location
            </label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control form-control-sm border-0'
              id='favorite-food-input'
              placeholder='Favorite Food'
            />
            <label htmlFor='floatingInput' className='text-center'>
              Favorite Food
            </label>
          </div>
          <div className='mt-3 text-center d-grid'>
            <button id='sign-up-button' className='btn mt-1 fw-semibold'>
              Sign Up
            </button>
          </div>
        </form>
        <div className='mt-4 text-center'>
          <span>Already have an account? </span>
          <button
            className='p-0 border-0 bg-transparent primaryColor'
            id='showSignin'
            onClick={() => setLogin(!login)}
          >
            Sign In
          </button>
        </div>
      </div>
    </>
  );
};

export default Form;
