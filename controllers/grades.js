const Grades = require('../models/grades');

exports.addGrades = (req, res) => {
  Grades.insertMany(req.body)
    .then(() => {
      console.log('Data inserted');
    })
    .catch((error) => {
      console.log(error);
    });
};

//fetch student’s grades

exports.getStudentGrades = (req, res) => {
  Grades.find({ idCourse: req.params.id })
    .populate('idStudent')
    .populate('idCourse')
    .then((student) => {
      res.send(student);
    })
    .catch((err) => {
      console.log(err);
    });
};

//fetch grade students

exports.getCourseGrades = (req, res) => {
  Grades.find({ idStudent: req.params.id })
    .populate('idStudent')
    .populate('idCourse')
    .then((student) => {
      res.send(student);
    })
    .catch((err) => {
      console.log(err);
    });
};
