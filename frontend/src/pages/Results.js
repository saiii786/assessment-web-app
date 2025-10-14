import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
  background: #f0f8ff;
  border-radius: 8px;
`;

const Score = styled.h2`
  color: ${props => props.percentage >= 70 ? 'green' : props.percentage >= 50 ? 'orange' : 'red'};
`;

function Results() {
  const { state } = useLocation();
  const { user } = useAuth();
  const { type, score, total, percentage, scenario, response } = state || {};

  if (!state) return <Container><p>No results found. <Link to="/assessments">Back to Assessments</Link></p></Container>;

  const handleCertificate = () => {
    let cert;
    if (type === 'practical') {
      cert = `Practical Cert for ${user.email}\n${scenario}: Submitted\n${new Date().toDateString()}`;
    } else {
      cert = `Certificate for ${user.email}\n${score}/${total} (${percentage}%)\n${new Date().toDateString()}`;
    }
    const blob = new Blob([cert], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'assessment-certificate.txt';
    a.click();
  };

  if (type === 'practical') {
    return (
      <Container>
        <h1>Practical Results</h1>
        <h2>Scenario: {scenario}</h2>
        <p><strong>Your Response:</strong></p>
        <div style={{ textAlign: 'left', background: '#f9f9f9', padding: '1rem', borderRadius: '4px' }}>
          {response}
        </div>
        <p>HR will review this for real-world analysis skills.</p>
        <button onClick={handleCertificate} style={{ padding: '0.5rem 1rem', margin: '1rem' }}>
          Download Certificate
        </button>
        <Link to="/assessments">Back to Assessments</Link>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Results</h1>
      <Score percentage={percentage}>Score: {score}/{total} ({percentage}%)</Score>
      <p>Great job! Review and try another quiz.</p>
      <button onClick={handleCertificate} style={{ padding: '0.5rem 1rem', margin: '1rem' }}>
        Download Certificate
      </button>
      <Link to="/assessments">Back to Assessments</Link>
    </Container>
  );
}

export default Results;




// import React from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import styled from 'styled-components';

// const Container = styled.div`
//   max-width: 600px;
//   margin: 2rem auto;
//   padding: 2rem;
//   text-align: center;
//   background: #f0f8ff;
//   border-radius: 8px;
// `;

// const Score = styled.h2`
//   color: ${props => props.percentage >= 70 ? 'green' : props.percentage >= 50 ? 'orange' : 'red'};
// `;

// function Results() {
//   const { state } = useLocation();
//   const { user } = useAuth();
//   const { score, total, percentage } = state || {};

//   if (!state) return <Container><p>No results found. <Link to="/assessments">Back to Assessments</Link></p></Container>;

//   const handleCertificate = () => {
//     const cert = `Certificate for ${user.email}\n${score}/${total} (${percentage}%)\n${new Date().toDateString()}`;
//     const blob = new Blob([cert], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'assessment-certificate.txt';
//     a.click();
//   };

//   return (
//     <Container>
//       <h1>Results</h1>
//       <Score percentage={percentage}>Score: {score}/{total} ({percentage}%)</Score>
//       <p>Great job! Review and try another quiz.</p>
//       <button onClick={handleCertificate} style={{ padding: '0.5rem 1rem', margin: '1rem' }}>
//         Download Certificate
//       </button>
//       <Link to="/assessments">Back to Assessments</Link>
//     </Container>
//   );
// }

// export default Results;









// import React from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import styled from 'styled-components';

// const Container = styled.div`
//   max-width: 600px;
//   margin: 2rem auto;
//   padding: 2rem;
//   text-align: center;
//   background: #f0f8ff;
//   border-radius: 8px;
// `;

// const Score = styled.h2`
//   color: ${props => props.percentage >= 70 ? 'green' : props.percentage >= 50 ? 'orange' : 'red'};
// `;

// function Results() {
//   const { state } = useLocation();
//   const { user } = useAuth();
//   const { score, total, percentage } = state || {};

//   if (!state) return <Container><p>No results found. <Link to="/assessments">Back to Assessments</Link></p></Container>;

//   const handleCertificate = () => {
//     // Simple text "certificate" – prod: PDF lib
//     const cert = `Certificate for ${user.email}\n${score}/${total} in ${location.pathname.split('/')[2]}\n${new Date().toDateString()}`;
//     const blob = new Blob([cert], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'assessment-certificate.txt';
//     a.click();
//   };

//   return (
//     <Container>
//       <h1>Results</h1>
//       <Score percentage={percentage}>Score: {score}/{total} ({percentage}%)</Score>
//       <p>Great job! Review and try another quiz.</p>
//       <button onClick={handleCertificate} style={{ padding: '0.5rem 1rem', margin: '1rem' }}>
//         Download Certificate
//       </button>
//       <Link to="/assessments">Back to Assessments</Link>
//     </Container>
//   );
// }

// export default Results;