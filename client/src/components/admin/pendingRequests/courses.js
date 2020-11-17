import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Students() {
  const [pendingCourse, setPendingCourse] = useState([]);
  const [count, setCount] = useState(0);

  //fetch pending user
  const fetchPendingCourse = () => {
    axios
      .get('/getCourse/Waiting')
      .then((res) => {
        setPendingCourse(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(
    (count) => {
      fetchPendingCourse();
    },
    [count]
  );

  // Changing status by the admin
  const changeStatus = (id, status) => {
    axios
      .put('/courseApproved', { id: id, status: status })
      .then((res) => {
        res.status(200).send('Succrss');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <section className="techerTable">
        <div className="row">
          <div className="col-sm-12">
            <div className="content-panel">
              <h4>Courses </h4>
              <hr />
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Course Name</th>
                    <th>Description</th>
                    <th>Added by</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingCourse.length !== 0 ? (
                    pendingCourse.map((course, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{course.name}</td>
                          <td>{course.description}</td>
                          {/* <td>{course.courseAddingBy.fullName}</td> */}
                          <td>{course.addDate.slice(0, 10)}</td>
                          <td>
                            <button
                              className="btn btn-success btn-ac"
                              onClick={() => {
                                changeStatus(course._id, 'Approved');
                                setCount(count + 1);
                              }}
                            >
                              <i className="fa fa-check"></i>
                            </button>
                            <button
                              className="btn btn-danger btn-acx"
                              onClick={() => {
                                changeStatus(course._id, 'Rejected');
                                setCount(count + 1);
                              }}
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className="h3 d-flex justify-content-center">
                      <td>There is no Data to view</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
