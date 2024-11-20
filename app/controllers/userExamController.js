const { Question, Exam, UserExam, User } = require('../models/projectModel');

exports.saveUserExamAttempt = async (req, res) => {
  try {
    const { fireId } = req.params;

    console.log(fireId);
    console.log(req.body);

    // Fetch the user and exam
    const user = await User.findOne({ fireId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const exam = await Exam.findById(req.body._id).populate('questions');
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    // Process answers
    const answers = req.body.questions;
    let score = 0;
    const responses = exam.questions.map((question) => {
      const answer = answers.find(ans => ans._id === question._id.toString());
      const selectedAnswer = answer ? answer.selectedAnswer : null;
      const isCorrect = selectedAnswer === question.correctAnswer;
      if (isCorrect) score += question.questionPoint || 1;
      return {
        question: question._id,
        selectedAnswer,
        isCorrect,
      };
    });

    // Create and save UserExam
    const userExam = new UserExam({
      user: user._id,
      exam: exam._id,
      score,
      responses,
    });

    await userExam.save();
    res.status(201).json({
      message: 'User exam attempt saved successfully',
      userExam,
    });
  } catch (error) {
    console.error('Error saving user exam attempt:', error);
    res.status(500).json({ error: 'Error occurred while saving answers' });
  }
};

const categories = [
  'Тоон ба үсэгт илэрхийлэл',
  'Функц',
  'Тэгшитгэл ба тэнцэтгэл биш',
  'Дараалал',
  'Тригонометр',
  'Функцийн уламжлал',
  'Интеграл',
  'Координатын систем',
  'Вектор',
  'Хавтгайн геометр',
  'Огторгуйн геометр',
  'Магадлал статистик',
  'Комплекс тоо',
  'Матриц',
];

exports.getStatistic = async (req, res) => {
  try {
    console.log('statistic orson')
    const { fireId } = req.params;
    const user = await User.findOne({ fireId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Initialize statistics with all categories
    const categoryStats = {};
    categories.forEach((category) => {
      categoryStats[category] = { total: 0, correct: 0 };
    });

    // Fetch UserExam data and populate question details
    const userExams = await UserExam.find({ user: user._id })
      .populate({
        path: 'responses.question',
        select: 'category', // Only populate the category field
      })
      .exec();

    console.log('statistic ene hurtel gaigu')
    // Aggregate data by category
    console.log(userExams);
    userExams.forEach((userExam) => {
      console.log(userExam);
      userExam.responses.forEach((response) => {
        console.log(response);
        const category = response.question?.category; // Ensure question exists
        if (category && categoryStats[category]) {
          categoryStats[category].total += 1;
          if (response.isCorrect) {
            categoryStats[category].correct += 1;
          }
        }
      });
    });

    console.log('statistic za garwuu')

    // Compute percentages and format results
    const statistics = Object.entries(categoryStats).map(([category, stats]) => ({
      category,
      totalQuestions: stats.total,
      correctAnswers: stats.correct,
      percentage: stats.total > 0 ? ((stats.correct / stats.total) * 100).toFixed(2) : '0.00',
    }));

    console.log('statistic odoo end')

    return res.json(statistics);
  } catch (error) {
    console.error('Error fetching user statistics:', error);
    throw error;
  }
};

