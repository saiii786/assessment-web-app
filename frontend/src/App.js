// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/api/auth/login', { email, password });
//       setMessage(`Login successful! Token: ${res.data.token.substring(0, 20)}...`);
//       console.log(res.data); // Check in browser console
//     } catch (err) {
//       setMessage(err.response?.data?.msg || 'Error occurred');
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/api/auth/signup', { email, password });
//       setMessage(`Signup successful! Token: ${res.data.token.substring(0, 20)}...`);
//       console.log(res.data);
//     } catch (err) {
//       setMessage(err.response?.data?.msg || 'Error occurred');
//     }
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
//       <h1>Assessment App - Test Auth</h1>
//       <form onSubmit={handleSignup}>
//         <h3>Signup</h3>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
//         />
//         <button type="submit" style={{ padding: '10px', width: '100%' }}>Signup</button>
//       </form>
//       <form onSubmit={handleLogin}>
//         <h3>Login</h3>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
//         />
//         <button type="submit" style={{ padding: '10px', width: '100%' }}>Login</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default App;



// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/api/auth/login', { email, password });
//       setMessage(`Login successful! Token: ${res.data.token.substring(0, 20)}...`);
//       console.log(res.data); // Check in browser console
//     } catch (err) {
//       setMessage(err.response?.data?.msg || 'Error occurred');
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/api/auth/signup', { email, password });
//       setMessage(`Signup successful! Token: ${res.data.token.substring(0, 20)}...`);
//       console.log(res.data);
//     } catch (err) {
//       setMessage(err.response?.data?.msg || 'Error occurred');
//     }
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
//       <h1>Assessment App - Test Auth</h1>
//       <form onSubmit={handleSignup}>
//         <h3>Signup</h3>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
//         />
//         <button type="submit" style={{ padding: '10px', width: '100%' }}>Signup</button>
//       </form>
//       <form onSubmit={handleLogin}>
//         <h3>Login</h3>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
//         />
//         <button type="submit" style={{ padding: '10px', width: '100%' }}>Login</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default App;





import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import LMSDashboard from './pages/LMSDashboard';
import Login from './pages/Login';
import './App.css'; // Keep for global styles if needed

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/lms"
            element={
              <ProtectedRoute>
                <LMSDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Login />} /> {/* Default to login */}
          {/* Placeholder for assessments */}
          <Route
            path="/assessments"
            element={
              <ProtectedRoute>
                <div style={{ padding: '2rem' }}>
                  <h1>Assessments Coming Soon!</h1>
                  <p>MCQs and Practical Logic sections will be here.</p>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;