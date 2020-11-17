const express = require('express');

const courseController = require('../controllers/sendEmail');

const router = express.Router();
router.post('/sendEmail', courseController.sendEmail);

module.exports = router;
