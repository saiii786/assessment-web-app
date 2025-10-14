const mongoose = require('mongoose');

const scenarioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // e.g., "Database is halted due to high load. Explain your approach."
});

const practicalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scenarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Scenario', required: true },
  response: { type: String, required: true }, // User's paragraph
  completedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Practical', practicalSchema);

// Separate model for scenarios (static)
const Scenario = mongoose.model('Scenario', scenarioSchema);
module.exports.Scenario = Scenario;