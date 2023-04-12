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
    console.log(values);
    const authUser = await api.login(values);
    if (!authUser) {
      alert('Email and or Password is incorrect');
    }
    const userData = authUser.data;
    console.log(userData);
    if (userData.session.loggedIn === true) {
      setIsAuth(true);
    }

    for (let key in userData.session) {
      if (key === 'userId' || key === 'loggedIn') {
        activeUser.push(userData.session[key]);
      }
    }
    localStorage.setItem('activeUser', JSON.stringify(activeUser));
    navigate('/home');
  };
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
              id='emailInput'
              type='email'
              onChange={(e) => setValues({ ...values, email: e.target.value })}
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
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
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
          <h2 className='fw-bold mb-4 text-center mt-2'>Sign Up</h2>
        </div>
        <form action=''>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control form-control-sm'
              id='display-name-input'
              placeholder='First Name'
            />
            <label htmlFor='floatingInput' className='text-center'>
              First Name
            </label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control form-control-sm'
              id='display-name-input'
              placeholder='Last Name'
            />
            <label htmlFor='floatingInput' className='text-center'>
              Last Name
            </label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control form-control-sm'
              id='display-name-input'
              placeholder='Location'
            />
            <label htmlFor='floatingInput' className='text-center'>
              Location
            </label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control form-control-sm'
              id='display-name-input'
              placeholder='Favorite Food'
            />
            <label htmlFor='floatingInput' className='text-center'>
              Favorite Food
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

export default Form;

// MACKEY
// =======================================
// import { useState } from 'react';
// import {
//   Box,
//   Button,
//   TextField,
//   useMediaQuery,
//   Typography,
//   useTheme,
// } from '@mui/material';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import { Formik } from 'formik';
// import * as yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setLogin } from 'state';
// import Dropzone from 'react-dropzone';
// import FlexBetween from './style-components/FlexBetween';

// const registerSchema = yup.object().shape({
//   firstName: yup.string().required('required'),
//   lastName: yup.string().required('required'),
//   email: yup.string().email('invalid email').required('required'),
//   password: yup.string().required('required'),
//   location: yup.string().required('required'),
//   favoriteFood: yup.string().required('required'),
//   picture: yup.string().required('required'),
// });

// const loginSchema = yup.object().shape({
//   email: yup.string().email('invalid email').required('required'),
//   password: yup.string().required('required'),
// });

// const initialValuesRegister = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   password: '',
//   location: '',
//   favoriteFood: '',
//   picture: '',
// };

// const initialValuesLogin = {
//   email: '',
//   password: '',
// };

// const Form = () => {
//   const [pageType, setPageType] = useState('login');
//   const { palette } = useTheme();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isNonMobile = useMediaQuery('(min-width:600px)');
//   const isLogin = pageType === 'login';
//   const isRegister = pageType === 'register';

//   const register = async (values, onSubmitProps) => {
//     // this allows us to send form info with image
//     const formData = new FormData();
//     for (let value in values) {
//       formData.append(value, values[value]);
//     }
//     formData.append('picturePath', values.picture.name);

//     const savedUserResponse = await fetch(
//       'http://localhost:3001/auth/register',
//       {
//         method: 'POST',
//         body: formData,
//       }
//     );
//     const savedUser = await savedUserResponse.json();
//     onSubmitProps.resetForm();

//     if (savedUser) {
//       setPageType('login');
//     }
//   };

//   const login = async (values, onSubmitProps) => {
//     const loggedInResponse = await fetch('http://localhost:3001/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(values),
//     });
//     const loggedIn = await loggedInResponse.json();
//     onSubmitProps.resetForm();
//     if (loggedIn) {
//       dispatch(
//         setLogin({
//           user: loggedIn.user,
//           token: loggedIn.token,
//         })
//       );
//       navigate('/home');
//     }
//   };

//   const handleFormSubmit = async (values, onSubmitProps) => {
//     if (isLogin) await login(values, onSubmitProps);
//     if (isRegister) await register(values, onSubmitProps);
//   };

//   return (
//     <div
//       className='form-box p-md-5'
//       id='signinForm'
//       style={{ display: login ? 'block' : 'none' }}
//     >
//       <Formik
//         onSubmit={handleFormSubmit}
//         initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
//         validationSchema={isLogin ? loginSchema : registerSchema}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleBlur,
//           handleChange,
//           handleSubmit,
//           setFieldValue,
//           resetForm,
//         }) => (
//           <form onSubmit={handleSubmit}>
//             <Box
//               display='grid'
//               gap='30px'
//               gridTemplateColumns='repeat(4, minmax(0, 1fr))'
//               sx={{
//                 '& > div': {
//                   gridColumn: isNonMobile ? undefined : 'span 4',
//                 },
//               }}
//             >
//               {isRegister && (
//                 <>
//                   <TextField
//                     label='First Name'
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.firstName}
//                     name='firstName'
//                     error={
//                       Boolean(touched.firstName) && Boolean(errors.firstName)
//                     }
//                     helperText={touched.firstName && errors.firstName}
//                     sx={{ gridColumn: 'span 2', borderRadius: '18px' }}
//                     // className='border-radius: 18px'
//                   />
//                   <TextField
//                     label='Last Name'
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.lastName}
//                     name='lastName'
//                     error={
//                       Boolean(touched.lastName) && Boolean(errors.lastName)
//                     }
//                     helperText={touched.lastName && errors.lastName}
//                     sx={{ gridColumn: 'span 2' }}
//                   />
//                   <TextField
//                     label='Location'
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.location}
//                     name='location'
//                     error={
//                       Boolean(touched.location) && Boolean(errors.location)
//                     }
//                     helperText={touched.location && errors.location}
//                     sx={{ gridColumn: 'span 4' }}
//                   />
//                   <TextField
//                     label='Favorite Food'
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.favoriteFood}
//                     name='favoriteFood'
//                     error={
//                       Boolean(touched.favoriteFood) &&
//                       Boolean(errors.favoriteFood)
//                     }
//                     helperText={touched.favoriteFood && errors.favoriteFood}
//                     sx={{ gridColumn: 'span 4' }}
//                   />
//                   <Box
//                     gridColumn='span 4'
//                     border={`1px solid ${palette.neutral.medium}`}
//                     borderRadius='5px'
//                     p='1rem'
//                   >
//                     <Dropzone
//                       acceptedFiles='.jpg,.jpeg,.png'
//                       multiple={false}
//                       onDrop={(acceptedFiles) =>
//                         setFieldValue('picture', acceptedFiles[0])
//                       }
//                     >
//                       {({ getRootProps, getInputProps }) => (
//                         <Box
//                           {...getRootProps()}
//                           border={`2px dashed ${palette.primary.main}`}
//                           p='1rem'
//                           sx={{ '&:hover': { cursor: 'pointer' } }}
//                         >
//                           <input {...getInputProps()} />
//                           {!values.picture ? (
//                             <p>Add Picture Here</p>
//                           ) : (
//                             <FlexBetween>
//                               <Typography>{values.picture.name}</Typography>
//                               <EditOutlinedIcon />
//                             </FlexBetween>
//                           )}
//                         </Box>
//                       )}
//                     </Dropzone>
//                   </Box>
//                 </>
//               )}

//               <TextField
//                 label='Email'
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.email}
//                 name='email'
//                 error={Boolean(touched.email) && Boolean(errors.email)}
//                 helperText={touched.email && errors.email}
//                 sx={{ gridColumn: 'span 4' }}
//               />
//               <TextField
//                 label='Password'
//                 type='password'
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.password}
//                 name='password'
//                 error={Boolean(touched.password) && Boolean(errors.password)}
//                 helperText={touched.password && errors.password}
//                 sx={{ gridColumn: 'span 4' }}
//               />
//             </Box>

//             {/* BUTTONS */}
//             <Box>
//               <Button
//                 fullWidth
//                 type='submit'
//                 sx={{
//                   m: '2rem 0',
//                   p: '1rem',
//                   backgroundColor: palette.primary.main,
//                   color: palette.background.alt,
//                   '&:hover': { color: palette.primary.main },
//                 }}
//               >
//                 {isLogin ? 'LOGIN' : 'REGISTER'}
//               </Button>
//               <Typography
//                 onClick={() => {
//                   setPageType(isLogin ? 'register' : 'login');
//                   resetForm();
//                 }}
//                 sx={{
//                   textDecoration: 'underline',
//                   color: palette.primary.main,
//                   '&:hover': {
//                     cursor: 'pointer',
//                     color: palette.primary.light,
//                   },
//                 }}
//               >
//                 {isLogin
//                   ? "Don't have an account? Register here."
//                   : 'Already have an account? Login here.'}
//               </Typography>
//             </Box>
//           </form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// import { BiLogInCircle } from 'react-icons/bi';
// import { RiAccountPinBoxFill } from 'react-icons/ri';

// const Form = ({ login, setLogin }) => {
//   return (
//     <>
//       <div
//         className='form-box p-md-5'
//         id='signinForm'
//         style={{ display: login ? 'block' : 'none' }}
//       >
//         <div className='form-title'>
//           <div className='text-center mb-3 loginIcon'>
//             <BiLogInCircle size={52} />
//           </div>
//           <h2 className='fw-bold mb-4 text-center mt-2'>Sign In</h2>
//         </div>
//         <form action=''>
//           <div className='form-floating mb-3'>
//             <input
//               id='emailInput'
//               type='email'
//               className='form-control form-control-sm'
//               placeholder='Email'
//             />
//             <label htmlFor='floatingInput' className='text-center'>
//               Email
//             </label>
//           </div>
//           <div className='form-floating mb-3'>
//             <input
//               id='passwordInput'
//               type='password'
//               className='form-control form-control-sm'
//               placeholder='Password'
//             />
//             <label htmlFor='floatingPassword' className='text-center'>
//               Password
//             </label>
//           </div>
//           <div className='mt-3 text-center d-grid'>
//             <button id='signInButton' className='btn text-center mt-1'>
//               Sign In
//             </button>
//           </div>
//         </form>
//         <div className='mt-4 text-center'>
//           <span>Don't have an account? </span>
//           <button
//             className='p-0 border-0 bg-transparent primaryColor'
//             id='showSignup'
//             onClick={() => setLogin(!login)}
//           >
//             Sign Up
//           </button>
//         </div>
//       </div>
//       <div
//         className='form-box p-md-5'
//         id='signupForm'
//         style={{ display: !login ? 'block' : 'none' }}
//       >
//         <div className='form-title'>
//           <div className='text-center mb-3 loginIcon'>
//             <RiAccountPinBoxFill size={50} />
//           </div>
//           <h2 className='fw-bold mb-4 text-center mt-2'>Sign Up</h2>
//         </div>
//         <form action=''>
//           {/* <div className='form-floating mb-3'>
//             <input
//               type='text'
//               className='form-control form-control-sm'
//               id='display-name-input'
//               placeholder='Display Name'
//             />
//             <label htmlFor='floatingInput' className='text-center'>
//               Display Name
//             </label>
//           </div> */}
//           <div className='form-floating mb-3'>
//             <input
//               type='text'
//               className='form-control form-control-sm'
//               id='first-name-input'
//               placeholder='First Name'
//             />
//             <label htmlFor='floatingInput' className='text-center'>
//               First Name
//             </label>
//           </div>
//           <div className='form-floating mb-3'>
//             <input
//               type='text'
//               className='form-control form-control-sm'
//               id='last-name-input'
//               placeholder='Last Name'
//             />
//             <label htmlFor='floatingInput' className='text-center'>
//               Last Name
//             </label>
//           </div>
//           <div className='form-floating mb-3'>
//             <input
//               type='text'
//               className='form-control form-control-sm'
//               placeholder='Location'
//               id='location-input'
//             />
//             <label htmlFor='floatingInput' className='text-center'>
//               Location
//             </label>
//           </div>
//           <div className='form-floating mb-3'>
//             <input
//               type='text'
//               className='form-control form-control-sm'
//               placeholder='Favorite Food'
//               id='favorite-food-input'
//             />
//             <label htmlFor='floatingInput' className='text-center'>
//               Favorite Food
//             </label>
//           </div>
//           <div className='form-floating mb-3'>
//             <input
//               type='email'
//               className='form-control form-control-sm'
//               placeholder='Email'
//               id='sign-up-email-input'
//             />
//             <label htmlFor='floatingInput' className='text-center'>
//               Email
//             </label>
//           </div>
//           <div className='form-floating mb-3'>
//             <input
//               type='password'
//               className='form-control form-control-sm'
//               placeholder='Password'
//               name='floatingPassword'
//               id='sign-up-password-input'
//             />
//             <label htmlFor='floatingPassword' className='text-center'>
//               Password
//             </label>
//           </div>
//           <div className='mt-3 text-center d-grid'>
//             <button id='sign-up-button' className='btn mt-1'>
//               Sign Up
//             </button>
//           </div>
//         </form>
//         <div className='mt-4 text-center'>
//           <span>Already have an account? </span>
//           <button
//             className='p-0 border-0 bg-transparent primaryColor'
//             id='showSignin'
//             onClick={() => setLogin(!login)}
//           >
//             Sign In
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Form;
