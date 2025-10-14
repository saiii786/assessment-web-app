const express = require('express');
const Result = require('../models/Result');
const Practical = require('../models/Practical');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// GET all results + practicals (admin only)
router.get('/results', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Admin access only' });
  }
  try {
    const results = await Result.find({}).populate('userId', 'email');
    const practicals = await Practical.find({}).populate('userId', 'email').populate('scenarioId', 'title');
    res.json({ mcqResults: results, practicals });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;