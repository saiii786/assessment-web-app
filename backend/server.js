// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Route imports
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quizzes');
const practicalRoutes = require('./routes/practicals');
const adminRoutes = require('./routes/admin');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ====================
// ✅ CORS Configuration
// ====================
const allowedOrigins = [
  'https://assessment-web-app-five.vercel.app', // Current deployed frontend
  'https://assessment-web-app-git-main-sai-ganeshs-projects-21941860.vercel.app', // Old Vercel build (for compatibility)
  'http://localhost:3000', // Local dev
];

// Dynamically allow only valid origins
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`❌ Blocked CORS request from: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ====================
// ✅ MongoDB Connection
// ====================
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error('❌ MongoDB URI missing! Add MONGO_URI=your_connection_string in .env');
  process.exit(1);
}

// Basic route
app.get('/', (req, res) => {
  res.send('✅ Assessment Web App Backend is Running!');
});

// ---- MongoDB Connection ----
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB Connected Successfully');
    await seedQuizzes();
    await seedScenarios();
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  }
};

// ---- Seed Quizzes ----
const seedQuizzes = async () => {
  try {
    const Quiz = require('./models/Quiz');
    const categories = [
      'aptitude',
      'vocabulary',
      'numerical-reasoning',
      'verbal-reasoning',
      'logical-reasoning',
      'abstract-reasoning',
      'programming-fundamentals',
    ];

    for (const cat of categories) {
      const existing = await Quiz.findOne({ category: cat });
      if (!existing) {
        const sampleQuestions = [
          {
            text: `What is a sample ${cat} question? Option A is correct.`,
            options: ['A', 'B', 'C', 'D'],
            correctIndex: 0,
          },
          {
            text: `Another ${cat} Q: Choose B.`,
            options: ['W', 'X', 'Y', 'Z'],
            correctIndex: 1,
          },
          { text: `Q3 for ${cat}: C right.`, options: ['1', '2', '3', '4'], correctIndex: 2 },
          { text: `Q4: True.`, options: ['True', 'False'], correctIndex: 0 },
          { text: `Q5: D.`, options: ['Opt1', 'Opt2', 'Opt3', 'Opt4'], correctIndex: 3 },
        ];
        await new Quiz({ category: cat, questions: sampleQuestions }).save();
        console.log(`🌱 Seeded quiz category: ${cat}`);
      }
    }
    console.log('✅ All quizzes seeded!');
  } catch (err) {
    console.error('❌ Quiz seeding error:', err);
  }
};

// ---- Seed Scenarios ----
const seedScenarios = async () => {
  try {
    const Scenario = require('./models/Practical').Scenario;
    const samples = [
      {
        title: 'Database Halt',
        description: 'Production DB unresponsive — describe your troubleshooting process.',
      },
      {
        title: 'API Bug Fix',
        description: 'API returning 500 errors intermittently — outline debugging steps.',
      },
      {
        title: 'Performance Issue',
        description: 'App load time spiked — explain optimization plan.',
      },
    ];

    for (const s of samples) {
      const existing = await Scenario.findOne({ title: s.title });
      if (!existing) {
        await new Scenario(s).save();
        console.log(`🌱 Seeded scenario: ${s.title}`);
      }
    }
    console.log('✅ All practical scenarios seeded!');
  } catch (err) {
    console.error('❌ Scenario seeding error:', err);
  }
};

// ---- Routes ----
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/practicals', practicalRoutes);
app.use('/api/admin', adminRoutes);

// ---- Start Server ----
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectDB(); // connect only after server starts
});







// // server.js
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// // Route imports
// const authRoutes = require('./routes/auth');
// const quizRoutes = require('./routes/quizzes');
// const practicalRoutes = require('./routes/practicals');
// const adminRoutes = require('./routes/admin');

// // Load environment variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
// app.use(express.json());

// // Verify MongoDB URI is loaded
// const mongoURI = process.env.MONGO_URI || process.env.MONGO_URI;
// if (!mongoURI) {
//   console.error('❌ MongoDB URI missing! Add MONGO_URI=your_connection_string in .env');
//   process.exit(1);
// }

// // Basic route
// app.get('/', (req, res) => {
//   res.send('✅ Assessment Web App Backend is Running!');
// });

// // ---- MongoDB Connection ----
// const connectDB = async () => {
//   try {
//     await mongoose.connect(mongoURI);
//     console.log('✅ MongoDB Connected Successfully');
//     await seedQuizzes();
//     await seedScenarios();
//   } catch (err) {
//     console.error('❌ MongoDB Connection Error:', err);
//     process.exit(1);
//   }
// };

// // ---- Seed Quizzes ----
// const seedQuizzes = async () => {
//   try {
//     const Quiz = require('./models/Quiz');
//     const categories = [
//       'aptitude',
//       'vocabulary',
//       'numerical-reasoning',
//       'verbal-reasoning',
//       'logical-reasoning',
//       'abstract-reasoning',
//       'programming-fundamentals'
//     ];
//     for (const cat of categories) {
//       const existing = await Quiz.findOne({ category: cat });
//       if (!existing) {
//         const sampleQuestions = [
//           { text: `What is a sample ${cat} question? Option A is correct.`, options: ['A', 'B', 'C', 'D'], correctIndex: 0 },
//           { text: `Another ${cat} Q: Choose B.`, options: ['W', 'X', 'Y', 'Z'], correctIndex: 1 },
//           { text: `Q3 for ${cat}: C right.`, options: ['1', '2', '3', '4'], correctIndex: 2 },
//           { text: `Q4: True.`, options: ['True', 'False'], correctIndex: 0 },
//           { text: `Q5: D.`, options: ['Opt1', 'Opt2', 'Opt3', 'Opt4'], correctIndex: 3 },
//         ];
//         await new Quiz({ category: cat, questions: sampleQuestions }).save();
//         console.log(`🌱 Seeded quiz category: ${cat}`);
//       }
//     }
//     console.log('✅ All quizzes seeded!');
//   } catch (err) {
//     console.error('❌ Quiz seeding error:', err);
//   }
// };

// // ---- Seed Scenarios ----
// const seedScenarios = async () => {
//   try {
//     const Scenario = require('./models/Practical').Scenario;
//     const samples = [
//       { title: 'Database Halt', description: 'Production DB unresponsive — describe your troubleshooting process.' },
//       { title: 'API Bug Fix', description: 'API returning 500 errors intermittently — outline debugging steps.' },
//       { title: 'Performance Issue', description: 'App load time spiked — explain optimization plan.' },
//     ];
//     for (const s of samples) {
//       const existing = await Scenario.findOne({ title: s.title });
//       if (!existing) {
//         await new Scenario(s).save();
//         console.log(`🌱 Seeded scenario: ${s.title}`);
//       }
//     }
//     console.log('✅ All practical scenarios seeded!');
//   } catch (err) {
//     console.error('❌ Scenario seeding error:', err);
//   }
// };

// // ---- Routes ----
// app.use('/api/auth', authRoutes);
// app.use('/api/quizzes', quizRoutes);
// app.use('/api/practicals', practicalRoutes);
// app.use('/api/admin', adminRoutes);

// // ---- Start Server ----
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   connectDB(); // connect only after server starts
// });







// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth');
// const quizRoutes = require('./routes/quizzes');
// const practicalRoutes = require('./routes/practicals');
// const adminRoutes = require('./routes/admin');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
// app.use(express.json());

// // Database Connection (NEW: This was missing!)
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDB connected successfully!');
//     // NEW: Seed quizzes after connection
//     seedQuizzes();
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//     process.exit(1); // Exit if DB fails
//   });

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/quizzes', quizRoutes);
// app.use('/api/practicals', practicalRoutes);
// app.use('/api/admin', adminRoutes);

// // Basic route
// app.get('/', (req, res) => {
//   res.send('Assessment Web App Backend is Running!');
// });

// // Seed quizzes (IMPROVED: Made async, called after DB connect)
// const seedQuizzes = async () => {
//   try {
//     const Quiz = require('./models/Quiz');
//     const categories = ['aptitude', 'vocabulary', 'numerical-reasoning', 'verbal-reasoning', 'logical-reasoning', 'abstract-reasoning', 'programming-fundamentals'];
//     for (const cat of categories) {
//       const existing = await Quiz.findOne({ category: cat });
//       if (!existing) {
//         const sampleQuestions = [
//           { text: `What is a sample ${cat} question? Option A is correct.`, options: ['A', 'B', 'C', 'D'], correctIndex: 0 },
//           { text: `Another ${cat} Q: Choose B.`, options: ['W', 'X', 'Y', 'Z'], correctIndex: 1 },
//           { text: `Q3 for ${cat}: C right.`, options: ['1', '2', '3', '4'], correctIndex: 2 },
//           { text: `Q4: True.`, options: ['True', 'False'], correctIndex: 0 },
//           { text: `Q5: D.`, options: ['Opt1', 'Opt2', 'Opt3', 'Opt4'], correctIndex: 3 },
//         ];
//         await new Quiz({ category: cat, questions: sampleQuestions }).save();
//         console.log(`Seeded ${cat} quiz`);
//       }
//     }
//     console.log('All quizzes seeded!');
//   } catch (err) {
//     console.error('Seeding error:', err);
//   }
// };

// // Start Server (NEW: This was missing!)
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });






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


// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth');
// const quizRoutes = require('./routes/quizzes'); // New
// const practicalRoutes = require('./routes/practicals');
// const adminRoutes = require('./routes/admin');


// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/quizzes', quizRoutes);
// app.use('/api/practicals', practicalRoutes);
// app.use('/api/admin', adminRoutes);

// // Basic route
// app.get('/', (req, res) => {
//   res.send('Assessment Web App Backend is Running!');
// });

// // Seed function (moved here)
// const seedQuizzes = async () => {
//   const Quiz = require('./models/Quiz'); // Require here
//   const categories = ['aptitude', 'vocabulary', 'numerical-reasoning', 'verbal-reasoning', 'logical-reasoning', 'abstract-reasoning', 'programming-fundamentals'];
//   for (const cat of categories) {
//     const existing = await Quiz.findOne({ category: cat });
//     if (!existing) {
//       const sampleQuestions = [
//         { text: `What is a sample ${cat} question? Option A is correct.`, options: ['A', 'B', 'C', 'D'], correctIndex: 0 },
//         { text: `Another ${cat} Q: Choose B.`, options: ['W', 'X', 'Y', 'Z'], correctIndex: 1 },
//         { text: `Q3 for ${cat}: C right.`, options: ['1', '2', '3', '4'], correctIndex: 2 },
//         { text: `Q4: True.`, options: ['True', 'False'], correctIndex: 0 },
//         { text: `Q5: D.`, options: ['Opt1', 'Opt2', 'Opt3', 'Opt4'], correctIndex: 3 },
//       ];
//       await new Quiz({ category: cat, questions: sampleQuestions }).save();
//       console.log(`Seeded ${cat} quiz`);
//     }
//   }
// };

// // MongoDB Connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB Connected');
//     await seedQuizzes(); // Seed after connect
//     await seedScenarios(); // From practicals
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
// const authRoutes = require('./routes/auth');
// const quizRoutes = require('./routes/quizzes');
// const practicalRoutes = require('./routes/practicals');
// const adminRoutes = require('./routes/admin');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/quizzes', quizRoutes);
// app.use('/api/practicals', practicalRoutes);
// app.use('/api/admin', adminRoutes);

// // Basic route
// app.get('/', (req, res) => {
//   res.send('Assessment Web App Backend is Running!');
// });

// // Seed quizzes (from Task 4)
// const seedQuizzes = async () => {
//   const Quiz = require('./models/Quiz');
//   const categories = ['aptitude', 'vocabulary', 'numerical-reasoning', 'verbal-reasoning', 'logical-reasoning', 'abstract-reasoning', 'programming-fundamentals'];
//   for (const cat of categories) {
//     const existing = await Quiz.findOne({ category: cat });
//     if (!existing) {
//       const sampleQuestions = [
//         { text: `What is a sample ${cat} question? Option A is correct.`, options: ['A', 'B', 'C', 'D'], correctIndex: 0 },
//         { text: `Another ${cat} Q: Choose B.`, options: ['W', 'X', 'Y', 'Z'], correctIndex: 1 },
//         { text: `Q3 for ${cat}: C right.`, options: ['1', '2', '3', '4'], correctIndex: 2 },
//         { text: `Q4: True.`, options: ['True', 'False'], correctIndex: 0 },
//         { text: `Q5: D.`, options: ['Opt1', 'Opt2', 'Opt3', 'Opt4'], correctIndex: 3 },
//       ];
//       await new Quiz({ category: cat, questions: sampleQuestions }).save();
//       console.log(`Seeded ${cat} quiz`);
//     }
//   }
// };










// // Seed scenarios (from Task 5 – defined inline here)
// const seedScenarios = async () => {
//   const Scenario = require('./models/Practical').Scenario;
//   const samples = [
//     { title: 'Database Halt', description: 'The production database is unresponsive due to an unexpected error. Describe your step-by-step troubleshooting approach, tools you\'d use (e.g., logs, monitoring), analysis method, and resolution strategy.' },
//     { title: 'API Bug Fix', description: 'An API endpoint is returning 500 errors intermittently. Explain how you\'d debug this in a team setting, including testing tools, code review steps, and deployment fixes.' },
//     { title: 'Performance Issue', description: 'App load time has spiked. Outline your diagnostic process, potential causes, optimization techniques, and metrics to track success.' },
//   ];
//   for (const s of samples) {
//     const existing = await Scenario.findOne({ title: s.title });
//     if (!existing) {
//       await new Scenario(s).save();
//       console.log(`Seeded scenario: ${s.title}`);
//     }
//   }
// };

// // MongoDB Connection (removed deprecated options)
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log('MongoDB Connected');
//     await seedQuizzes();
//     await seedScenarios(); // Now defined above
//   } catch (err) {
//     console.error('MongoDB Connection Error:', err);
//     process.exit(1);
//   }
// };
// connectDB();

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });