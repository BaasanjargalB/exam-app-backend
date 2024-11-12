const Exam = require('../models/projectModel');

exports.getExam = async (req, res) => {
  try {
    const { examId } = req.params;

    const exam = await Exam.findById(examId);

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    
    res.json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while fetching exam questions');
  }
};

exports.getExamAll = async (req, res) => {
  try {

    const exams = await Exam.find().select('-questions');
    
    res.json(exams);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while fetching exam questions');
  }
};
