import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Techers() {
  const [idCourses, setIdCourses] = useState('');

  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState(300);

  const [dataCourses, setDataCourses] = useState([]);
  const [dataStudents, setDataStudents] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get('/getCourse/Approved')
        .then((res) => {
          setDataCourses(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, [idCourses]);

  useEffect(() => {
    if (searchTo.length === 0) {
      setSearchTo(300);
    } else {
      setFilteredStudents(
        dataStudents.filter(
          (student) => student.grade >= searchFrom && student.grade <= searchTo
        )
      );
    }
  }, [searchFrom, searchTo, dataStudents]);

  const displayStudents = (id) => {
    axios
      .get(`/getStudentGrades/${id}`)
      .then((res) => {
        setDataStudents(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <section className="techerTable">
        <div className="row">
          <div className="col-sm-12">
            <div className="content-panel">
              <h4>Student</h4>
              Search For Grade From
              <input
                type="text"
                onChange={(e) => {
                  setSearchFrom(e.target.value);
                }}
              ></input>
              To
              <input
                type="text"
                onChange={(e) => {
                  setSearchTo(e.target.value);
                }}
              ></input>
              <div className=" ml-4 mt-1">
                <p>Choose the Course</p>
                <select
                  onChange={(e) => {
                    setIdCourses(e.target.value);
                    displayStudents(e.target.value);
                  }}
                >
                  <option disabled selected value>
                    -- select an Course --
                  </option>
                  {dataCourses ? (
                    dataCourses.map((options, i) => {
                      return (
                        <option key={i} value={options._id}>
                          {options.name}
                        </option>
                      );
                    })
                  ) : (
                    <option>null</option>
                  )}
                </select>
              </div>
              <hr />
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length !== 0 ? (
                    filteredStudents.map((student, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{student.idStudent.fullName}</td>
                          <td>{student.idStudent.phoneNumber}</td>
                          <td>{student.idStudent.email}</td>
                          <td>{student.grade}</td>
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
