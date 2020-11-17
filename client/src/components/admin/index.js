import React, { useState } from 'react';
import './style.css';
import Home from './Profile';
import Teacher from './tableViews/teachers';
import Students from './tableViews/students';
import PendingIndex from './pendingRequests/pendingIndex';
import AssginCourse from './assignCourses/assignCourses';
import Courses from './tableViews/courses';
import axios from 'axios';

export default function AdminIndex() {
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
              href={() => false}
              onClick={() => {
                setView('home');
              }}
              className="list-group-item list-group-item-action bg-light"
            >
              Dashboard
            </a>
            <a
              href={() => false}
              onClick={() => {
                setView('teachers');
              }}
              className="list-group-item list-group-item-action bg-light"
            >
              Teachers
            </a>
            <a
              href={() => false}
              onClick={() => {
                setView('students');
              }}
              className="list-group-item list-group-item-action bg-light"
            >
              Students
            </a>
            <a
              href={() => false}
              onClick={() => {
                setView('courses');
              }}
              className="list-group-item list-group-item-action bg-light"
            >
              Courses
            </a>
            <a
              href={() => false}
              onClick={() => {
                setView('requests');
              }}
              className="list-group-item list-group-item-action bg-light"
            >
              Requests
            </a>
            <a
              href={() => false}
              onClick={() => {
                setView('AssignCourses');
              }}
              className="list-group-item list-group-item-action bg-light"
            >
              Assign Courses
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

            <ul className="navbar-nav ml-auto mt-2 mr-2 mt-lg-0">
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
          </nav>
          {view === 'home' ? (
            <Home />
          ) : view === 'teachers' ? (
            <Teacher />
          ) : view === 'students' ? (
            <Students />
          ) : view === 'courses' ? (
            <Courses />
          ) : view === 'requests' ? (
            <PendingIndex />
          ) : view === 'AssignCourses' ? (
            <AssginCourse />
          ) : null}
        </div>
      </div>
    </>
  );
}
