import React, { useState } from 'react';
import './style.css';
import AddGrades from './addGrades';
import GradesStudents from './gradesStudents';
import Students from '../admin/tableViews/students';
import Courses from '../admin/tableViews/courses';
import Home from './profile';
import axios from 'axios';

export default function TecherIndex() {
  const [toggle, settoggle] = useState(false);
  const [view, setView] = useState('home');
  const currentUser = JSON.parse(localStorage.getItem('userLogin'));

  const timelogout = () => {
    axios
      .put('/updateLastLogin', { id: currentUser._id, lastLogin: Date.now() })
      .then((res) => {
        res.status(200).send('Succrss');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={toggle ? 'd-flex toggled' : 'd-flex '} id="wrapper">
        {/* Sidebar */}
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading">School </div>
          <div className="list-group list-group-flush">
            <a
              href="#"
              className="list-group-item list-group-item-action bg-light"
              onClick={() => {
                setView('home');
              }}
            >
              Dashboard
            </a>

            <a
              href="#"
              className="list-group-item list-group-item-action bg-light"
              onClick={() => {
                setView('Students');
              }}
            >
              Students
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action bg-light"
              onClick={() => {
                setView('Courses');
              }}
            >
              Courses
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action bg-light"
              onClick={() => {
                setView('addGrades');
              }}
            >
              Add Grades
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action bg-light"
              onClick={() => {
                setView('gradesStudents');
              }}
            >
              Display Grades Students
            </a>
          </div>
        </div>
        {/* /#sidebar-wrapper  */}

        {/* Page Content  */}
        <div id="page-content-wrapper">
          <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <button
              className="btn btn-primary"
              id="menu-toggle"
              onClick={() => {
                settoggle(!toggle);
              }}
            >
              <i className="fa fa-bars"></i>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item ">
                  <a
                    className="nav-link"
                    href="/"
                    onClick={() => {
                      timelogout();
                      localStorage.clear();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          {view === 'home' ? (
            <Home />
          ) : view === 'Students' ? (
            <Students />
          ) : view === 'Courses' ? (
            <Courses />
          ) : view === 'addGrades' ? (
            <AddGrades />
          ) : view === 'gradesStudents' ? (
            <GradesStudents />
          ) : null}
        </div>
      </div>
    </>
  );
}
