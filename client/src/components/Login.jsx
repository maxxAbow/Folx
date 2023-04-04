import React from 'react';

import { BiLogInCircle } from 'react-icons/bi';
import { RiAccountPinBoxFill } from 'react-icons/ri';

const Login = ({ login, setLogin }) => {
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
          <h2 className='fw-bold mb-4 text-center'>Sign In</h2>
        </div>
        <form action=''>
          <div className='form-floating mb-3'>
            <input
              id='emailInput'
              type='email'
              className='form-control form-control-sm'
              placeholder='Email'
            />
            <label htmlFor='floatingInput' className='text-center'>
              Email
            </label>
          </div>
          <div className='form-floating mb-3'>
            <input
              id='passwordInput'
              type='password'
              className='form-control form-control-sm'
              placeholder='Password'
            />
            <label htmlFor='floatingPassword' className='text-center'>
              Password
            </label>
          </div>
          <div className='mt-3 text-center d-grid'>
            <button id='signInButton' className='btn text-center mt-1'>
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
          <h2 className='fw-bold mb-4 text-center'>Sign Up</h2>
        </div>
        <form action=''>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control form-control-sm'
              id='display-name-input'
              placeholder='Display Name'
            />
            <label htmlFor='floatingInput' className='text-center'>
              Display Name
            </label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='email'
              className='form-control form-control-sm'
              placeholder='Email'
              id='sign-up-email-input'
            />
            <label htmlFor=' floatingInput' className='text-center'>
              Email
            </label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='password'
              className='form-control form-control-sm'
              placeholder='Password'
              name='floatingPassword'
              id='sign-up-password-input'
            />
            <label htmlFor='floatingPassword' className='text-center'>
              Password
            </label>
          </div>
          <div className='mt-3 text-center d-grid'>
            <button id='sign-up-button' className='btn mt-1'>
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

export default Login;
