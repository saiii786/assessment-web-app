const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// ---- Helper ----
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// ---- Signup ----
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const newUser = new User({ name, email, password });
    if (email.includes('admin')) {
      newUser.role = 'admin';
    }

    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error('❌ Signup Error:', err.message);
    res.status(500).json({ msg: 'Server error during signup', error: err.message });
  }
});

// ---- Login ----
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
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