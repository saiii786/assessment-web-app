import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #333;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 1rem;
  &:hover { text-decoration: underline; }
`;

const Button = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
`;

function Header() {
  const { user, logout, isAdmin } = useAuth(); // Add isAdmin here
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <Nav>
      <div>
        <NavLink to="/">Assessment App</NavLink>
        {user && (
          <>
            <NavLink to="/lms">LMS</NavLink>
            <NavLink to="/assessments">Assessments</NavLink>
            {isAdmin && <NavLink to="/admin">Admin Dashboard</NavLink>} {/* Add this conditional */}
          </>
        )}
      </div>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: '1rem' }}>Hi, {user.email}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </Nav>
  );
}

export default Header;


// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import styled from 'styled-components';

// const Nav = styled.nav`
//   background: #333;
//   color: white;
//   padding: 1rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const NavLink = styled(Link)`
//   color: white;
//   text-decoration: none;
//   margin-right: 1rem;
//   &:hover { text-decoration: underline; }
// `;

// const Button = styled.button`
//   background: #ff6b6b;
//   color: white;
//   border: none;
//   padding: 0.5rem 1rem;
//   cursor: pointer;
//   border-radius: 4px;
// `;

// function Header() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <Nav>
//       <div>
//         <NavLink to="/">Assessment App</NavLink>
//         {user && (
//           <>
//             <NavLink to="/lms">LMS</NavLink>
//             <NavLink to="/assessments">Assessments</NavLink>
//           </>
//         )}
//       </div>
//       <div>
//         {user ? (
//           <>
//             <span style={{ marginRight: '1rem' }}>Hi, {user.email}</span>
//             <Button onClick={handleLogout}>Logout</Button>
//           </>
//         ) : (
//           <NavLink to="/login">Login</NavLink>
//         )}
//       </div>
//     </Nav>
//   );
// }

// export default Header;