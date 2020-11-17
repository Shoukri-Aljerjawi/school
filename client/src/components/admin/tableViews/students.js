import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Techers() {
  const [data, setData] = useState('');
  const [count, setCount] = useState(0);

  useEffect(
    (count) => {
      const fetchStudent = () => {
        axios
          .get('/getUser/Approved/Student')
          .then((res) => {
            setData(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      fetchStudent();
    },
    [count]
  );

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
              <h4>Student</h4>
              <hr />
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length !== 0 ? (
                    data.map((student, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{student.fullName}</td>
                          <td>{student.phoneNumber}</td>
                          <td>{student.email}</td>
                          <td>
                            <button
                              onClick={() => {
                                changeStatus(student._id, 'Rejected');
                                setCount(count + 1);
                              }}
                              className="btn btn-danger btn-ac"
                            >
                              <i className="fa fa-trash-o "></i>
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
