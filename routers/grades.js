const express = require('express');

const gradesController = require('../controllers/grades');

const router = express.Router();

router.post('/add-grades', gradesController.addGrades);
router.get('/getStudentGrades/:id/', gradesController.getStudentGrades);
router.get('/getCourseGrades/:id/', gradesController.getCourseGrades);

module.exports = router;
