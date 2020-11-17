import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

export default function Login() {
  const history = useHistory();

  const [logIn, setlogIn] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  function handleChange(e) {
    const value = e.target.value;
    setlogIn({
      ...logIn,
      [e.target.name]: value,
    });
  }

  function lognIn() {
    axios
      .post('/loginUser', logIn)
      .then((res) => {
        localStorage.setItem('userLogin', JSON.stringify(res.data));

        if (res.data.status === 'Waiting') {
          setMessage(
            <div className="alert alert-warning" role="alert">
              Your account waiting for approval
            </div>
          );
        } else if (res.data.status === 'Approved') {
          setMessage(
            <div className="alert alert-success" role="alert">
              welcome {res.data.fullName} you login as {res.data.roler}
            </div>
          );
          setTimeout(() => {
            history.push(`/${res.data.roler}`);
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage(
          <div className="alert alert-danger" role="alert">
            Your email or password is incorrect
          </div>
        );
      });
  }

  return (
    <>
      <div className="sufee-login d-flex align-content-center flex-wrap">
        <div className="register-form">
          {message}
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" /> Remember Me
              </label>
              <label className="pull-right">
                <a href="/Admin">Forgotten Password?</a>
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-success btn-flat m-b-30 m-t-30"
              onClick={lognIn}
            >
              Sign in
            </button>
            <div className="register-link m-t-15 text-center">
              <p>
                Don't have account ? <a href="/Register"> Sign Up Here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
