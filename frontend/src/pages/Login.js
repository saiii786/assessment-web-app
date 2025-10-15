import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

// ========== Styled Components ==========
const FormContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

// ========== Component ==========
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // New: only used in signup
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Your deployed backend base URL
  const API_BASE_URL = 'https://assessment-web-app.onrender.com';

  // Toggle between login and signup
  const handleToggle = () => {
    setIsSignup(!isSignup);
    setEmail('');
    setPassword('');
    setName('');
    setMessage('');
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const endpoint = isSignup
        ? `${API_BASE_URL}/api/auth/signup`
        : `${API_BASE_URL}/api/auth/login`;

      // Signup may need 'name' field depending on backend schema
      const payload = isSignup ? { name, email, password } : { email, password };

      const res = await axios.post(endpoint, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      login(res.data.token, res.data.user);
      setMessage('Success! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err) {
      console.error('❌ Auth error:', err.response || err.message);
      const errorMsg =
        err.response?.data?.msg ||
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Server error';
      setMessage(isSignup ? `Signup failed: ${errorMsg}` : `Login failed: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <button
        onClick={handleToggle}
        style={{ marginBottom: '1rem' }}
        disabled={loading}
      >
        Switch to {isSignup ? 'Login' : 'Sign Up'}
      </button>

      <form onSubmit={handleSubmit}>
        {isSignup && (
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        )}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          disabled={loading}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete={isSignup ? 'new-password' : 'current-password'}
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading
            ? isSignup
              ? 'Signing Up...'
              : 'Logging In...'
            : isSignup
            ? 'Sign Up'
            : 'Login'}
        </Button>
      </form>

      {message && (
        <p style={{ color: message.includes('Success') ? 'green' : 'red' }}>{message}</p>
      )}
    </FormContainer>
  );
}

export default Login;





// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';
// import styled from 'styled-components';

// const FormContainer = styled.div`
//   max-width: 400px;
//   margin: 2rem auto;
//   padding: 2rem;
//   border: 1px solid #ddd;
//   border-radius: 8px;
// `;

// const Input = styled.input`
//   display: block;
//   width: 100%;
//   padding: 0.75rem;
//   margin: 0.5rem 0;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 0.75rem;
//   background: #007bff;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   &:hover { background: #0056b3; }
//   &:disabled { background: #ccc; cursor: not-allowed; } // New: For loading state
// `;

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSignup, setIsSignup] = useState(false);
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false); // New: Loading state
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   // New: Reset form when toggling mode
//   const handleToggle = () => {
//     setIsSignup(!isSignup);
//     setEmail('');
//     setPassword('');
//     setMessage('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Start loading
//     setMessage(''); // Clear previous messages
//     try {
//       const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
//       const res = await axios.post(endpoint, { email, password });
//       login(res.data.token, res.data.user);
//       setMessage('Success! Redirecting...');
      
//       // New: Auto-redirect after a brief delay (or immediate if no delay needed)
//       setTimeout(() => {
//         navigate('/dashboard'); // Adjust to your protected route
//       }, 1500);
//     } catch (err) {
//       // Improved: Handle common backend error formats
//       const errorMsg = err.response?.data?.msg || err.response?.data?.error || 'An error occurred';
//       setMessage(isSignup ? `Signup failed: ${errorMsg}` : `Login failed: ${errorMsg}`);
//     } finally {
//       setLoading(false); // End loading
//     }
//   };

//   return (
//     <FormContainer>
//       <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
//       <button onClick={handleToggle} style={{ marginBottom: '1rem' }} disabled={loading}>
//         Switch to {isSignup ? 'Login' : 'Sign Up'}
//       </button>
//       <form onSubmit={handleSubmit}>
//         <Input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           autoComplete={isSignup ? "email" : "email"} // New: Better autocomplete
//           disabled={loading} // New: Disable during load
//         />
//         <Input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           autoComplete={isSignup ? "new-password" : "current-password"} // New: Better autocomplete
//           disabled={loading} // New: Disable during load
//         />
//         <Button type="submit" disabled={loading}>
//           {loading ? (isSignup ? 'Signing Up...' : 'Logging In...') : (isSignup ? 'Sign Up' : 'Login')}
//         </Button>
//       </form>
//       {message && <p style={{ color: message.includes('Success') ? 'green' : 'red' }}>{message}</p>}
//     </FormContainer>
//   );
// }

// export default Login;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';
// import styled from 'styled-components';

// const FormContainer = styled.div`
//   max-width: 400px;
//   margin: 2rem auto;
//   padding: 2rem;
//   border: 1px solid #ddd;
//   border-radius: 8px;
// `;

// const Input = styled.input`
//   display: block;
//   width: 100%;
//   padding: 0.75rem;
//   margin: 0.5rem 0;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 0.75rem;
//   background: #007bff;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   &:hover { background: #0056b3; }
// `;

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSignup, setIsSignup] = useState(false);
//   const [message, setMessage] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
//       const res = await axios.post(endpoint, { email, password });
//       login(res.data.token, res.data.user);
//       setMessage('Success! Redirecting...');
//     } catch (err) {
//       setMessage(err.response?.data?.msg || 'Error occurred');
//     }
//   };

//   return (
//     <FormContainer>
//       <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
//       <button onClick={() => setIsSignup(!isSignup)} style={{ marginBottom: '1rem' }}>
//         Switch to {isSignup ? 'Login' : 'Sign Up'}
//       </button>
//       <form onSubmit={handleSubmit}>
//         <Input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <Input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <Button type="submit">{isSignup ? 'Sign Up' : 'Login'}</Button>
//       </form>
//       {message && <p style={{ color: message.includes('Success') ? 'green' : 'red' }}>{message}</p>}
//     </FormContainer>
//   );
// }

// export default Login;