import React, { useState } from 'react'; 
import api from 'utils/API';
import { BiLogInCircle } from 'react-icons/bi';
import { RiAccountPinBoxFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const Form = ({ login, setLogin, isAuth, setIsAuth, isNonMobileScreen}) => {
  const navigate = useNavigate();

  // Login Values from login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Sign-up values from Sign-up form
  const [createdUsername, setcreatedUsername] = useState("");
  const [createdEmail, setcreatedEmail] = useState("");
  const [createdPassword, setcreatedPassword] = useState("");
  const [createdLocation, setcreatedLocation] = useState("");
  const [createdFavFood, setcreatedFavFood] = useState("");

  // created empty array to store data from session
  const activeUser = [];

  const loginUser = async (e) => {
    e.preventDefault();
  
    // Makes POST request to server to login, and returns session data
    const authUser = await api.login({
      email: loginEmail.toLowerCase(),
      password: loginPassword
    });

    if (!authUser) {
      console.log('Email and or Password is incorrect');
    }

    const userData = authUser.data;

    // If user is logged in, set IsAuth state to true
    if (userData.session.loggedIn === true) {
      setIsAuth(true);
    }

    // Interates through properties of userData.session object , (checks the property keys )
    // And pushes the corresponding values to empty activeUser array.
    for (let key in userData.session) {
      if (key === 'userId' || key === 'loggedIn') {
        activeUser.push(userData.session[key]);
      }
    }
    // Pushes the value of userImage key (property) to the activeUser array
    activeUser.push(userData.user.userImage)
    // Saves activeUser Array to localStorage | Later development, implement session storage/cookies instead of local storage
    localStorage.setItem('activeUser', JSON.stringify(activeUser));

    // Navigates to homepage
    navigate('/home');
  };

  const createUser = async (e) => {
    e.preventDefault();
    // Makes POST request to server to createUser
    const createdUser = await api.createUser({
      username: createdUsername,
      email: createdEmail.toLowerCase(),
      password: createdPassword,
      location: createdLocation,
      favFood: createdFavFood,
      userImage: Math.floor(Math.random() * 5 + 1).toString()
    });

    //Check if user was created successfully, if not return null
    if (!createdUser) {
      return null
    }
    
    // If user is successfully created, make POST request to server to login, and returns session data
    const authUser = await api.login({
      email: createdEmail,
      password: createdPassword,
    });

    if (!authUser) {
      alert('Email and or Password is incorrect');
    }
    const userData = authUser.data;
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

  return (
    <div className='container form'>
    <div className="row justify-content-center align-items-center inner-row" id='form-box'>
    <img className='logo bounce-2' src='../assets/images/logos/folx-1.png' alt='Folx Logo'/>
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
        <form onSubmit={loginUser}>
          <div className='form-floating mb-3'>
            <input
              type='email'
              onChange={(e) => setLoginEmail(e.target.value)}
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
              onChange={(e) => setLoginPassword(e.target.value)}
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

      {/* The Sign-up Form is Below */}
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
        <form onSubmit={createUser}>
          <div className='form-floating mb-3'>
            <input
              type='text'
              onChange={(e) => setcreatedUsername( e.target.value )}
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
              onChange={(e) => setcreatedEmail(e.target.value)}
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
              onChange={(e) => setcreatedPassword(e.target.value )}
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
              onChange={(e) => setcreatedLocation(e.target.value)}
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
              onChange={(e) => setcreatedFavFood( e.target.value )}
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
      </div>
    </div>
  );
};

export default Form;
