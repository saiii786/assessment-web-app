const express = require('express');
const Quiz = require('../models/Quiz');
const Result = require('../models/Result');
const auth = require('../middleware/auth');
const router = express.Router();

// Seed sample quizzes on first run (call once or on startup)
const seedQuizzes = async () => {
  const categories = ['aptitude', 'vocabulary', 'numerical-reasoning', 'verbal-reasoning', 'logical-reasoning', 'abstract-reasoning', 'programming-fundamentals'];

  for (const cat of categories) {
    const existing = await Quiz.findOne({ category: cat });
    if (!existing) {
      const sampleQuestions = [
        { text: `Sample ${cat} Question 1?`, options: ['A', 'B', 'C', 'D'], correctIndex: 0 },
        { text: `Sample ${cat} Question 2?`, options: ['W', 'X', 'Y', 'Z'], correctIndex: 1 },
        // Add 3 more for 5 total - customize later
        { text: `Sample ${cat} Question 3?`, options: ['1', '2', '3', '4'], correctIndex: 2 },
        { text: `Sample ${cat} Question 4?`, options: ['True', 'False'], correctIndex: 0 },
        { text: `Sample ${cat} Question 5?`, options: ['Option1', 'Option2', 'Option3', 'Option4'], correctIndex: 3 },
      ];
      await new Quiz({ category: cat, questions: sampleQuestions }).save();
    }
  }
};

// GET quizzes by category
router.get('/:category', auth, async (req, res) => {
  try {
    await seedQuizzes(); // Ensure data exists
    const quiz = await Quiz.findOne({ category: req.params.category });
    if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });
    res.json(quiz.questions);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST submit answers
router.post('/submit', auth, async (req, res) => {
  try {
    const { category, answers } = req.body; // answers: [{questionIndex: 0, selectedIndex: 1}, ...]
    const quiz = await Quiz.findOne({ category });
    if (!quiz || answers.length !== quiz.questions.length) {
      return res.status(400).json({ msg: 'Invalid submission' });
    }

    let score = 0;
    answers.forEach(ans => {
      if (ans.selectedIndex === quiz.questions[ans.questionIndex].correctIndex) score++;
    });

    const result = new Result({
      userId: req.user._id,
      category,
      score,
      totalQuestions: quiz.questions.length,
      answers,
    });
    await result.save();

    res.json({ score, total: quiz.questions.length, percentage: Math.round((score / quiz.questions.length) * 100) });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;