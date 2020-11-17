import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Students() {
  const [courses, setCourses] = useState([]);
  const [count, setCount] = useState(0);

  //fetch courses
  useEffect(() => {
    const fetchCourse = () => {
      axios
        .get('/getAssignedCourses')
        .then((res) => {
          setCourses(res.data);
          const coursesData = res.data;
          const arr = coursesData.filter(
            (course) => typeof course.assignCourseTo !== 'undefined'
          );
          setCourses(arr);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchCourse();
  }, [count]);

  const changeStatus = (id, status) => {
    console.log(id, status);
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
                    <th>course Name</th>
                    <th>description</th>
                    <th>Added By</th>
                    <th>Addeed Date</th>
                    <th>Assign To</th>
                    <th>Action</th>
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
                          <td>{course.addDate.split('T')[0]}</td>
                          <td>
                            {course.assignCourseTo.fullName
                              ? course.assignCourseTo.fullName
                              : null}
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                changeStatus(course._id, 'Rejected');
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
