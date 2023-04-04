import React from 'react';

import {} from 'react-icons';

const Login = ({ login, setLogin }) => {
  return (
    <>
      <div
        className='form-box p-md-5 p-3'
        id='signinForm'
        style={{ display: login ? 'block' : 'none' }}
      >
        {/* <div className="form-name">
        <h2 className="fw-bold mb-3">weatherOrNot</h2>
        </div> */}
        <div className='form-title'>
          <h2 className='fw-bold mb-3'>Sign In</h2>
        </div>
        <form action=''>
          <div className='form-floating mb-3'>
            <input
              id='emailInput'
              type='email'
              className='form-control form-control-sm'
              placeholder='Email'
            />
            <label htmlFor='floatingInput'>Email</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              id='passwordInput'
              type='password'
              className='form-control form-control-sm'
              placeholder='Password'
            />
            <label htmlFor='floatingPassword'>Password</label>
          </div>
          <div className='mt-3'>
            <button id='signInButton' className='btn'>
              Sign In
            </button>
          </div>
        </form>
        <div className='mt-3'>
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
        className='form-box p-md-5 p-3'
        id='signupForm'
        style={{ display: !login ? 'block' : 'none' }}
      >
        <div className='form-title'>
          <h2 className='fw-bold mb-3'>Create Your Account</h2>
        </div>
        <form action=''>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control form-control-sm'
              id='display-name-input'
              placeholder='Display Name'
            />
            <label htmlFor='floatingInput'>Display Name</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='email'
              className='form-control form-control-sm'
              placeholder='Email'
              id='sign-up-email-input'
            />
            <label htmlFor=' floatingInput'>Email</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='password'
              className='form-control form-control-sm'
              placeholder='Password'
              name='floatingPassword'
              id='sign-up-password-input'
            />
            <label htmlFor='floatingPassword'>Password</label>
          </div>
          <div className='mt-3'>
            <button id='sign-up-button' className='btn'>
              Sign Up
            </button>
          </div>
        </form>
        <div className='mt-3'>
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
