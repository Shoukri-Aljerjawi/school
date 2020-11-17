import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Techers() {
  const [pindingUser, setPindingUser] = useState([]);
  const [count, setCount] = useState(0);

  //fetch pending user
  const fetchPendingUser = () => {
    axios
      .get('/getUser/Waiting/Teacher')
      .then((res) => {
        setPindingUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(
    (count) => {
      fetchPendingUser();
    },
    [count]
  );

  // Changing status by the admin
  const changeStatus = (id, status) => {
    axios
      .put('/userApproved', { id: id, status: status })
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
              <h4>Techers</h4>
              <hr />
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Techer Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pindingUser.length !== 0 ? (
                    pindingUser.map((user, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user.fullName}</td>
                          <td>{user.phoneNumber}</td>
                          <td>{user.email}</td>
                          <td>{user.gender}</td>
                          <td>
                            <button
                              className="btn btn-success btn-ac"
                              onClick={() => {
                                changeStatus(user._id, 'Approved');
                                setCount(count + 1);
                              }}
                            >
                              <i className="fa fa-check"></i>
                            </button>
                            <button
                              className="btn btn-danger btn-acx"
                              onClick={() => {
                                changeStatus(user._id, 'Rejected');
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
