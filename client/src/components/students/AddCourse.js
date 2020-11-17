import React, { useState } from 'react';
import axios from 'axios';

export default function AddCourse() {
  const currentUser = JSON.parse(localStorage.getItem('userLogin'));

  const [data, setData] = useState({
    name: '',
    description: '',
    note: '',
    courseAddingBy: currentUser._id,
  });

  const [message, setShowMessage] = useState();

  const handeChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const submitCourse = (e) => {
    e.preventDefault();
    axios.post('/add-course', data).then((res) => {
      console.log('done');
      setShowMessage(
        <div className="alert alert-primary" role="alert">
          The course has been added successfully
        </div>
      );
    });
  };
  return (
    <>
      <div class="d-flex justify-content-center  p-3">
        <div class="card">
          <div class="card-header">
            <strong>Add Course</strong>
          </div>
          {message}
          <div class="card-body card-block">
            <form class="form-horizontal">
              <div class="row form-group">
                <div class="col col-md-3">
                  <label for="text-input" class=" form-control-label">
                    Name
                  </label>
                </div>
                <div class="col-12 col-md-9">
                  <input
                    type="text"
                    id="text-input"
                    name="name"
                    placeholder="Course name "
                    class="form-control"
                    onChange={handeChange}
                  />
                </div>
              </div>
              <div class="row form-group">
                <div class="col col-md-3">
                  <label for="Description" class=" form-control-label">
                    Description
                  </label>
                </div>
                <div class="col-12 col-md-9">
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    class="form-control"
                    onChange={handeChange}
                  />
                </div>
              </div>
              <div class="row form-group">
                <div class="col col-md-3">
                  <label for="textarea-input" class=" form-control-label">
                    Notes
                  </label>
                </div>
                <div class="col-12 col-md-9">
                  <textarea
                    name="note"
                    placeholder="Content..."
                    class="form-control"
                    onChange={handeChange}
                  ></textarea>
                </div>
              </div>
              <div class="card-footer">
                <button
                  type="submit"
                  class="btn btn-primary btn-sm"
                  onClick={submitCourse}
                >
                  <i class="fa fa-dot-circle-o"></i> Submit
                </button>
                <button type="reset" class="btn btn-danger ml-3 btn-sm">
                  <i class="fa fa-ban"></i> Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
