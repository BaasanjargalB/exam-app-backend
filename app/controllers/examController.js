const { Question, Exam } = require('../models/projectModel');

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
    console.log("orjin");
    console.log(exams);

    
    res.json(exams);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while fetching exam questions');
  }
};

exports.saveUserExamAttempt = async (req, res) => {
  const { userId, examId, answers } = req.params
  const exam = await Exam.findById(examId);
  let score = 0;
  const responses = exam.questions.map((question, index) => {
    const selectedAnswer = answers[index];
    const isCorrect = selectedAnswer === question.correctAnswer;
    if (isCorrect) score++;
    return { question: question._id, selectedAnswer, isCorrect };
  });

  const userExam = new UserExam({
    user: userId,
    exam: examId,
    score,
    responses,
  });

  try {
    await userExam.save();
    res.status(204);
  } catch (error) {
    res.status(500).send('Error occured while saving answers.');
  }

};

exports.saveExam = async (req, res) => {
  try {
    const { examName, duration, totalPoint, questions } = req.body;

    // Validate input
    if (!examName || !duration || !totalPoint || !questions || questions.length === 0) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Save questions
    const savedQuestions = [];
    for (const questionData of questions) {
      const question = new Question(questionData);
      const savedQuestion = await question.save();
      savedQuestions.push(savedQuestion._id);
    }

    // Save exam
    const exam = new Exam({
      examName,
      duration,
      totalPoint,
      questions: savedQuestions,
    });
    const savedExam = await exam.save();

    res.status(201).json({
      message: 'Exam created successfully',
      exam: savedExam,
    });
  } catch (err) {
    console.error('Error saving exam:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
