import React, { useState, useEffect } from 'react';

import axios from 'axios';

export default function AssignCourses() {
  const [courses, setCourse] = useState([]);
  const [options, setOptions] = useState();
  const [selectedValue, setSelectedvalue] = useState();
  const [count, setCount] = useState(0);

  const [courseId, setCourseId] = useState();
  const [techId, setTechId] = useState();

  useEffect(
    (count) => {
      //fetch teacher
      axios
        .get('/getUser/Approved/Teacher')
        .then((res) => {
          const teacherData = res.data;
          const teachers = [];
          teacherData.map((teacher, index) => {
            return teachers.push({
              value: index,
              label: teacher.fullName,
              id: teacher._id,
            });
          });
          setOptions(teachers);
        })
        .catch((error) => {
          console.log(error);
        });
      //fetch courses
      axios
        .get('/coursesNonAssign/Approved')
        .then((res) => {
          setCourse(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [count]
  );

  const submitChange = () => {
    axios
      .put('/assignTech', { courseId: courseId, techId: techId })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(courseId, techId);
  };

  return (
    <>
      <section className="techerTable">
        <div className="row">
          <div className="col-sm-12">
            <div className="content-panel">
              <h4>Assign Courses To Teachers </h4>
              <hr />
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Course Name</th>
                    <th>Description</th>
                    <th>Added by</th>
                    <th>Date</th>
                    <th>Assign To </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length !== 0 ? (
                    courses.map((course, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{course.name}</td>
                          <td>{course.description}</td>
                          <td>{course.courseAddingBy.fullName}</td>
                          <td>{course.addDate.slice(0, 10)}</td>
                          <td>
                            <div className="box">
                              <select
                                value={selectedValue}
                                onChange={(e) => {
                                  setSelectedvalue(e.target.label);
                                  setCourseId(course._id);
                                  setTechId(e.target.value);
                                }}
                              >
                                <option disabled selected value>
                                  -- select an option --
                                </option>
                                {options.map((options, i) => {
                                  return (
                                    <option key={i} value={options.id}>
                                      {options.label}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <td>
                              <button
                                onClick={() => {
                                  submitChange();
                                  setCount(count + 1);
                                }}
                              >
                                save
                              </button>
                            </td>
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
