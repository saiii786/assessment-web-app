// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth'); // Add this import

// dotenv.config();
// console.log('MONGODB_URI loaded:', process.env.MONGODB_URI ? 'YES' : 'NO (undefined)');
// console.log('Full URI preview:', process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 50) + '...' : 'EMPTY');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes); // Mount auth routes

// // Basic route
// app.get('/', (req, res) => {
//   res.send('Assessment Web App Backend is Running!');
// });

// // MongoDB Connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB Connected');
//   } catch (err) {
//     console.error('MongoDB Connection Error:', err);
//     process.exit(1);
//   }
// };
// connectDB();

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth'); // Add this import

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes); // Mount auth routes
// const quizRoutes = require('./routes/quizzes');
// app.use('/api/quizzes', quizRoutes);

// // Basic route
// app.get('/', (req, res) => {
//   res.send('Assessment Web App Backend is Running!');
// });

// // MongoDB Connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     // Seed quizzes after DB connect
// seedQuizzes().then(() => console.log('Quizzes seeded'));
//     console.log('MongoDB Connected');
//   } catch (err) {
//     console.error('MongoDB Connection Error:', err);
//     process.exit(1);
//   }
// };
// connectDB();

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quizzes'); // New

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Assessment Web App Backend is Running!');
});

// Seed function (moved here)
const seedQuizzes = async () => {
  const Quiz = require('./models/Quiz'); // Require here
  const categories = ['aptitude', 'vocabulary', 'numerical-reasoning', 'verbal-reasoning', 'logical-reasoning', 'abstract-reasoning', 'programming-fundamentals'];
  for (const cat of categories) {
    const existing = await Quiz.findOne({ category: cat });
    if (!existing) {
      const sampleQuestions = [
        { text: `What is a sample ${cat} question? Option A is correct.`, options: ['A', 'B', 'C', 'D'], correctIndex: 0 },
        { text: `Another ${cat} Q: Choose B.`, options: ['W', 'X', 'Y', 'Z'], correctIndex: 1 },
        { text: `Q3 for ${cat}: C right.`, options: ['1', '2', '3', '4'], correctIndex: 2 },
        { text: `Q4: True.`, options: ['True', 'False'], correctIndex: 0 },
        { text: `Q5: D.`, options: ['Opt1', 'Opt2', 'Opt3', 'Opt4'], correctIndex: 3 },
      ];
      await new Quiz({ category: cat, questions: sampleQuestions }).save();
      console.log(`Seeded ${cat} quiz`);
    }
  }
};

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
    await seedQuizzes(); // Seed after connect
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  }
};
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});