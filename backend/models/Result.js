const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  score: { type: Number, required: true }, // e.g., 4/5
  totalQuestions: { type: Number, required: true },
  answers: [{ questionIndex: Number, selectedIndex: Number }],
  completedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Result', resultSchema);