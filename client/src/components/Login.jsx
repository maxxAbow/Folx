import React from 'react';

const Login = ({login, setLogin}) => {
  return (
    <>
    <div
        className="form-box p-md-5 p-3"
        id="signinForm"
        style={{display: login ? "block" : "none"}}
    >
        {/* <div className="form-name">
        <h2 className="fw-bold mb-3">weatherOrNot</h2>
        </div> */}
        <div className="form-title">
        <h2 className="fw-bold mb-3">Sign In</h2>
        </div>
        <form action="">
        <div className="form-floating mb-3">
            <input
            id="emailInput"
            type="email"
            className="form-control form-control-sm"
            placeholder="Email"
            />
            <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating mb-3">
            <input
            id="passwordInput"
            type="password"
            className="form-control form-control-sm"
            placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="mt-3">
            <button id="signInButton" className="btn">Sign In</button>
        </div>
        </form>
        <div className="mt-3">
        <span>Don't have an account? </span>
        <button
            className="p-0 border-0 bg-transparent primaryColor"
            id="showSignup"
            onClick={() => setLogin(!login)}
        >
            Sign Up
        </button>
        </div>
    </div>

</>
  )
};

export default Login;
