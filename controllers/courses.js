const { isValidObjectId } = require('mongoose');
const Courses = require('../models/courses');

exports.addCourse = (req, res) => {
  const course = new Courses({
    name: req.body.name,
    description: req.body.description,
    note:req.body.note,
    courseAddingBy: req.body.courseAddingBy,
  });
  course
    .save()
    .then((result) => {
      res.status(200).send('The course has been added successfully!');
    })
    .catch((err) => {
      res.status(400).send(err);
      console.log(err);
    });
};
//fetch Courses as required
exports.getCourses = (req, res) => {
  Courses.find({ status: req.params.status })
    .populate('courseAddingBy')
    .then((course) => {
      // console.log(course);
      res.send(course);
    })
    .catch((err) => {
      console.log(err);
    });
};

//fetch Courses not assign
exports.getCoursesNonAssign = (req, res) => {
  Courses.find({ status: req.params.status, assignCourseTo: undefined })
    .populate('courseAddingBy')
    .then((course) => {
      // console.log(course);
      res.send(course);
    })
    .catch((err) => {
      console.log(err);
    });
};

//found course by id and update the status
exports.updateCourseByID = (req, res) => {
  const id = req.body.id;
  const status = req.body.status;
  Courses.findOneAndUpdate({ _id: id }, { status: status }, function (
    error,
    result
  ) {
    if (error) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};

//Assign techer to course
exports.assignTecher = (req, res) => {
  const courseId = req.body.courseId;
  const techId = req.body.techId;
  console.log('sdfsdf', req.body);
  Courses.findOneAndUpdate(
    { _id: courseId },
    { assignCourseTo: techId },
    function (error, result) {
      if (error) {
        console.log(err);
      } else {
        res.send('done');
        console.log(result);
      }
    }
  );
};

//fetch assigned courses
exports.getAssignedCourses = (req, res) => {
  Courses.find({
    status: 'Approved',
  })
    .populate('assignCourseTo')
    .populate('courseAddingBy')
    .then((course) => {
      res.send(course);
    })
    .catch((err) => {
      console.log(err);
    });
};

//find courses depend to teacher

exports.getCoursesByTeacher = (req, res) => {
  const techId = req.params.techId.toString();
  console.log(req.params.techId);
  Courses.find({
    assignCourseTo: techId,
  })
    // .populate('assignCourseTo')
    // .populate('courseAddingBy')
    .then((course) => {
      res.send(course);
    })
    .catch((err) => {
      console.log(err);
    });
};


