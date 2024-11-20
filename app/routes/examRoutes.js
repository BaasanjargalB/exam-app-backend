const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

router.get('/all/:fireId', examController.getExamAll);
router.get('/take', examController.saveUserExamAttempt);
router.post('/create', examController.saveExam)
router.get('/:examId/:fireId', examController.getExam);

module.exports = router;
