const express = require('express');

const courseController = require('../controllers/courses');

const router = express.Router();

router.post('/add-course', courseController.addCourse);
router.get('/getCourse/:status', courseController.getCourses);
router.put('/courseApproved', courseController.updateCourseByID);
router.put('/assignTech', courseController.assignTecher);
router.get('/coursesNonAssign/:status', courseController.getCoursesNonAssign);
router.get('/getAssignedCourses', courseController.getAssignedCourses);
router.get(
  '/getCoursesByTeacher/:techId',
  courseController.getCoursesByTeacher
);


module.exports = router;
