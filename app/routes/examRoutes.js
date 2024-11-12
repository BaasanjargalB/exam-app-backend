const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

router.get('/all', examController.getExamAll);
router.get('/:examId', examController.getExam);

module.exports = router;
