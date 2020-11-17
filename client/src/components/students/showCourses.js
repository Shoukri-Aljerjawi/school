import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShowCourses() {
  const [data, setData] = useState();
  const currentUser = JSON.parse(localStorage.getItem('userLogin'));

  const fetchCourse = async () => {
    const res = await axios.get(`getCourseGrades/${currentUser._id}`);
    setData(res.data);
  };
  useEffect(() => {
    fetchCourse();
  }, []);
  return (
    <>
      <div class="card m-3">
        <div class="card-header">
          <strong class="card-title">Basic Table</strong>
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Course Name</th>
                <th>grade</th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                data.map((course, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{course.idCourse.name}</td>
                      <td>{course.grade}</td>
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
    </>
  );
}
