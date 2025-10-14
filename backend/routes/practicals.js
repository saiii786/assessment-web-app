const express = require('express');
const Practical = require('../models/Practical');
const Scenario = require('../models/Practical').Scenario;
const auth = require('../middleware/auth');
const router = express.Router();

// Seed scenarios
const seedScenarios = async () => {
  const samples = [
    { title: 'Database Halt', description: 'The production database is unresponsive due to an unexpected error. Describe your step-by-step troubleshooting approach, tools you\'d use (e.g., logs, monitoring), analysis method, and resolution strategy.' },
    { title: 'API Bug Fix', description: 'An API endpoint is returning 500 errors intermittently. Explain how you\'d debug this in a team setting, including testing tools, code review steps, and deployment fixes.' },
    { title: 'Performance Issue', description: 'App load time has spiked. Outline your diagnostic process, potential causes, optimization techniques, and metrics to track success.' },
    // Add 2 more if wanted
  ];
  for (const s of samples) {
    const existing = await Scenario.findOne({ title: s.title });
    if (!existing) await new Scenario(s).save();
  }
};

// GET scenarios
router.get('/', auth, async (req, res) => {
  try {
    await seedScenarios();
    const scenarios = await Scenario.find({});
    res.json(scenarios);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST submit response (one per scenario, or allow multiple)
router.post('/submit', auth, async (req, res) => {
  try {
    const { scenarioId, response } = req.body;
    if (!scenarioId || !response || response.length < 50) { // Min length for detail
      return res.status(400).json({ msg: 'Valid scenario and detailed response (50+ chars) required' });
    }

    const practical = new Practical({ userId: req.user._id, scenarioId, response });
    await practical.save();

    res.json({ msg: 'Response submitted successfully', id: practical._id });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;