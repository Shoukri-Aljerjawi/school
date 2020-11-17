import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Techers() {
  const [dataDisplay, setDataDisplay] = useState({
    students: null,
    courses: null,
  });

  const [course, setCourse] = useState({
    idCourse: '',
    nameCourse: '',
  });

  const [data, setData] = useState();
  const currentUser = JSON.parse(localStorage.getItem('userLogin'));

  useEffect(() => {
    const fetchData = async () => {
      const students = await axios(`/getUser/Approved/Student`);
      const courses = await axios(`/getCoursesByTeacher/${currentUser._id}`);

      setDataDisplay({ students: students.data, courses: courses.data });
    };

    fetchData();
  }, [currentUser._id]);

  const handleChange = (e, info) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  //submit grades to table

  const handelSubmit = () => {
    var arr = [];
    for (var key in data) {
      arr.push({
        idCourse: course.idCourse,
        idStudent: key,
        grade: data[key],
      });
    }

    axios
      .post('/add-grades', arr)
      .then((res) => {
        res.send(res);
      })

      .catch((err) => {
        console.log(err);
      });
    sendEmail();
  };

  //function to send Email to students
  const sendEmail = () => {
    var emailData = [];
    dataDisplay['students'].map((student) => {
      if (data[student._id] !== undefined) {
        var obj = {
          from: "'your mail-id'",
          to: student.email,
          subject: `Course ${course.nameCourse} grade has been added`,
          html: `<h2> Hi  ${student.fullName} <br /> The "${
            course.nameCourse
          }" course grade has been added and you have got ${
            data[student._id]
          } <br />  </h2><br>`,
        };

        emailData.push(obj);
      }
      
      return obj;
    });
    axios.post('/sendEmail', emailData).then(() => {
      console.log('email sended');
    });
  };

  return (
    <>
      <section className="techerTable">
        <div className="row">
          <div className="col-sm-12">
            <div className="content-panel">
              <h4>Student</h4>
              <input
                type="button"
                className="float-right mr-3"
                value="Submit"
                onClick={() => {
                  handelSubmit();
                }}
              />
              <div className=" ml-4 mt-1">
                <p>Choose the Course</p>
                <select
                  onChange={(e) => {
                    setCourse({
                      idCourse: e.target.value,
                      nameCourse: e.target.options[e.target.selectedIndex].text,
                    });
                    console.log(course);
                  }}
                >
                  <option disabled selected>
                    -- select an Course --
                  </option>
                  {dataDisplay['courses'] ? (
                    dataDisplay['courses'].map((options, i) => {
                      return (
                        <option
                          onClick={() => {
                            console.log(options.name);
                          }}
                          key={i}
                          label={options.name}
                          value={options._id}
                        >
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
                    <th>Courses</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {dataDisplay['students'] ? (
                    dataDisplay['students'].map((student, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td
                            onChange={() => {
                              console.log(student.fullName);
                            }}
                          >
                            {student.fullName}
                          </td>
                          <td>{student.phoneNumber}</td>
                          <td>{student.email}</td>
                          <td>
                            <input
                              name={student._id}
                              onChange={handleChange}
                              className="w-25 my-2"
                              type="text"
                              disabled={course.idCourse ? '' : true}
                            ></input>
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
