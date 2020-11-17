import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './style.css';

import axios from 'axios';

export default function Register() {
  const history = useHistory();
  const [registerData, setRegisterData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    gender: 'Male',
    roler: 'Student',
  });

  const [showMessage, setShowMessage] = useState('');

  function handleChange(e) {
    const value = e.target.value;
    setRegisterData({
      ...registerData,
      [e.target.name]: value,
    });
  }
  //Submit information
  function handelsubmint() {
    axios
      .post('/addUser', registerData)
      .then((res) => {
        setShowMessage(
          <div className="alert alert-primary" role="alert">
            Registration was successful
          </div>
        );
        setTimeout(() => {
          history.push('/Login');
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(
          <div className="alert alert-danger" role="alert">
            Error please check your information and try again
          </div>
        );
      });
  }

  return (
    <>
      <div className="sufee-login d-flex align-content-center flex-wrap">
        <div className="register-form">
          {showMessage}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              placeholder="User Name"
              onChange={handleChange}
            />
          </div>
          <label>phone number</label>
          <input
            type="number"
            name="phoneNumber"
            className="form-control"
            placeholder="Phone Number"
            onChange={handleChange}
          />
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
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <label>You Gender</label>
          <select
            value={registerData.gender}
            name="gender"
            className="gernde"
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <div className="choosesroler">
            <label>Choose you roler</label>
            <br />
            <label className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="roler"
                value="Teacher"
                onChange={handleChange}
              />
              <span className="form-check-label"> Teacher </span>
            </label>
            <label className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="roler"
                value="Student"
                defaultChecked
                onChange={handleChange}
              />
              <span className="form-check-label"> Student</span>
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-flat m-b-30 m-t-30"
            onClick={handelsubmint}
          >
            Register
          </button>

          <div className="register-link m-t-15 text-center">
            <p>
              Already have account ? <a href="/login"> Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
