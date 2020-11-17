import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Techers() {
  const [data, setData] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchTeacher = () => {
      axios
        .get('/getUser/Approved/Teacher')
        .then((res) => {
          setData(res.data);
          console.log(localStorage.getItem('user_name'));
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchTeacher();
  }, [count]);

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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length !== 0 ? (
                    data.map((teacher, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{teacher.fullName}</td>
                          <td>{teacher.phoneNumber}</td>
                          <td>{teacher.email}</td>
                          <td>
                            <button
                              onClick={() => {
                                changeStatus(teacher._id, 'Rejected');
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
