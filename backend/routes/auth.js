const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Helper: generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// ----------------- SIGNUP -----------------
router.post('/signup', async (req, res) => {
  try {
    const { email, password, username } = req.body;  // 👈 Added username destructuring

    // 👈 Enhanced validation for username (matches schema)
    if (!email || !password || !username) {
      return res.status(400).json({ msg: 'Email, password, and username are required' });
    }
    if (username.length < 3) {
      return res.status(400).json({ msg: 'Username must be at least 3 characters' });
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {  // Optional: Basic username format (alphanum + underscore)
      return res.status(400).json({ msg: 'Username can only contain letters, numbers, and underscores' });
    }

    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }]  // 👈 Check duplicates on both email and username
    });
    if (existingUser) {
      return res.status(400).json({ 
        msg: existingUser.email === email ? 'Email already exists' : 'Username already exists' 
      });
    }

    const newUser = new User({ 
      email: email.toLowerCase().trim(),  // 👈 Clean input
      password, 
      username: username.trim()  // 👈 Pass username and clean it
    });

    // Optional: automatically mark admin users by email pattern
    if (email.includes('admin')) {
      newUser.role = 'admin';
    }

    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,  // 👈 Include username in response
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error('❌ Signup Error:', err.message);
    
    // 👈 Specific handling for MongoDB duplicate key (E11000)
    if (err.code === 11000) {
      return res.status(400).json({ 
        msg: 'Username or email already exists. Please choose different ones.' 
      });
    }
    
    res.status(500).json({ msg: 'Server error during signup', error: err.message });
  }
});

// ----------------- LOGIN -----------------
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });  // 👈 Minor: Clean input
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,  // 👈 Optional: Include for consistency
        role: user.role,
      },
    });
  } catch (err) {
    console.error('❌ Login Error:', err.message);
    res.status(500).json({ msg: 'Server error during login', error: err.message });
  }
});

module.exports = router;



// const express = require('express');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const router = express.Router();

// // Helper: generate JWT token
// const generateToken = (user) => {
//   return jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: '1h' }
//   );
// };

// // ----------------- SIGNUP -----------------
// router.post('/signup', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ msg: 'Email and password are required' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     const newUser = new User({ email, password });

//     // Optional: automatically mark admin users by email pattern
//     if (email.includes('admin')) {
//       newUser.role = 'admin';
//     }

//     await newUser.save();

//     const token = generateToken(newUser);
//     res.status(201).json({
//       token,
//       user: {
//         id: newUser._id,
//         email: newUser.email,
//         role: newUser.role,
//       },
//     });
//   } catch (err) {
//     console.error('❌ Signup Error:', err.message);
//     res.status(500).json({ msg: 'Server error during signup', error: err.message });
//   }
// });

// // ----------------- LOGIN -----------------
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ msg: 'Email and password are required' });
//     }

//     const user = await User.findOne({ email });
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(401).json({ msg: 'Invalid credentials' });
//     }

//     const token = generateToken(user);
//     res.json({
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error('❌ Login Error:', err.message);
//     res.status(500).json({ msg: 'Server error during login', error: err.message });
//   }
// });

// module.exports = router;





// const express = require('express');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const router = express.Router();

// // ---- Helper ----
// const generateToken = (user) => {
//   return jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: '1h' }
//   );
// };

// // ---- Signup ----
// router.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ msg: 'Email and password are required' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     const newUser = new User({ name, email, password });
//     if (email.includes('admin')) {
//       newUser.role = 'admin';
//     }

//     await newUser.save();

//     const token = generateToken(newUser);
//     res.status(201).json({
//       token,
//       user: {
//         id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//         role: newUser.role,
//       },
//     });
//   } catch (err) {
//     console.error('❌ Signup Error:', err.message);
//     res.status(500).json({ msg: 'Server error during signup', error: err.message });
//   }
// });

// // ---- Login ----
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ msg: 'Email and password are required' });
//     }

//     const user = await User.findOne({ email });
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(401).json({ msg: 'Invalid credentials' });
//     }

//     const token = generateToken(user);
//     res.json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error('❌ Login Error:', err.message);
//     res.status(500).json({ msg: 'Server error during login', error: err.message });
//   }
// });

// module.exports = router;








// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');
// const router = express.Router();

// // Helper: Generate JWT
// const generateToken = (user) =>
//   jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

// // ==================== SIGNUP ====================
// router.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ msg: 'Email and password are required' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     // Hash password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Assign role automatically if email includes 'admin'
//     const role = email.includes('admin') ? 'admin' : 'user';

//     // Create user document
//     const user = new User({ name, email, password: hashedPassword, role });
//     await user.save();

//     // Generate token
//     const token = generateToken(user);

//     res.status(201).json({
//       token,
//       user: { id: user._id, name: user.name, email: user.email, role: user.role },
//     });
//   } catch (err) {
//     console.error('Signup Error:', err);
//     res.status(500).json({ msg: 'Server error during signup' });
//   }
// });

// // ==================== LOGIN ====================
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ msg: 'Email and password are required' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ msg: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ msg: 'Invalid credentials' });
//     }

//     const token = generateToken(user);

//     res.json({
//       token,
//       user: { id: user._id, name: user.name, email: user.email, role: user.role },
//     });
//   } catch (err) {
//     console.error('Login Error:', err);
//     res.status(500).json({ msg: 'Server error during login' });
//   }
// });

// module.exports = router;






// const express = require('express');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const router = express.Router();

// // Signup
// router.post('/signup', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ msg: 'Email and password required' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     const user = new User({ email, password });
//     await user.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(201).json({ token, user: { id: user._id, email: user.email, role: user.role } });
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ msg: 'Email and password required' });
//     }

//     const user = await User.findOne({ email });
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(401).json({ msg: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// module.exports = router;


// const express = require('express');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const router = express.Router();

// // Signup
// router.post('/signup', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ msg: 'Email and password required' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     const user = new User({ email, password });
//     if (email.includes('admin')) {
//     user.role = 'admin';
//     }
//     await user.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(201).json({ token, user: { id: user._id, email: user.email, role: user.role } });
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ msg: 'Email and password required' });
//     }

//     const user = await User.findOne({ email });
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(401).json({ msg: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// module.exports = router;