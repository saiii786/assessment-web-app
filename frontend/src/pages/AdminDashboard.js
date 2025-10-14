import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td { border: 1px solid #ddd; padding: 0.75rem; text-align: left; }
  th { background: #f2f2f2; }
`;

function AdminDashboard() {
  const [data, setData] = useState({ mcqResults: [], practicals: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/admin/results');
        setData(res.data);
      } catch (err) {
        alert('Access denied or error');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <Container><p>Loading HR Dashboard...</p></Container>;

  return (
    <Container>
      <h1>HR/Admin Dashboard</h1>
      <h2>MCQ Results</h2>
      <Table>
        <thead><tr><th>User Email</th><th>Category</th><th>Score</th><th>%</th></tr></thead>
        <tbody>
          {data.mcqResults.map((r, idx) => (
            <tr key={idx}>
              <td>{r.userId.email}</td>
              <td>{r.category}</td>
              <td>{r.score}/{r.totalQuestions}</td>
              <td>{Math.round((r.score / r.totalQuestions) * 100)}%</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2>Practical Responses</h2>
      <Table>
        <thead><tr><th>User Email</th><th>Scenario</th><th>Response Excerpt</th><th>Date</th></tr></thead>
        <tbody>
          {data.practicals.map((p, idx) => (
            <tr key={idx}>
              <td>{p.userId.email}</td>
              <td>{p.scenarioId.title}</td>
              <td>{p.response.substring(0, 100)}...</td>
              <td>{new Date(p.completedAt).toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminDashboard;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';

// const Container = styled.div`
//   max-width: 1200px;
//   margin: 2rem auto;
//   padding: 0 1rem;
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   th, td { border: 1px solid #ddd; padding: 0.75rem; text-align: left; }
//   th { background: #f2f2f2; }
// `;

// function AdminDashboard() {
//   const [data, setData] = useState({ mcqResults: [], practicals: [] });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get('/api/admin/results');
//         setData(res.data);
//       } catch (err) {
//         alert('Access denied or error');
//       }
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   if (loading) return <Container><p>Loading HR Dashboard...</p></Container>;

//   return (
//     <Container>
//       <h1>HR/Admin Dashboard</h1>
//       <h2>MCQ Results</h2>
//       <Table>
//         <thead><tr><th>User Email</th><th>Category</th><th>Score</th><th>%</th></tr></thead>
//         <tbody>
//           {data.mcqResults.map((r, idx) => (
//             <tr key={idx}>
//               <td>{r.userId.email}</td>
//               <td>{r.category}</td>
//               <td>{r.score}/{r.totalQuestions}</td>
//               <td>{r.score / r.totalQuestions * 100}%</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       <h2>Practical Responses</h2>
//       <Table>
//         <thead><tr><th>User Email</th><th>Scenario</th><th>Response Excerpt</th><th>Date</th></tr></thead>
//         <tbody>
//           {data.practicals.map((p, idx) => (
//             <tr key={idx}>
//               <td>{p.userId.email}</td>
//               <td>{p.scenarioId.title}</td>
//               <td>{p.response.substring(0, 100)}...</td>
//               <td>{new Date(p.completedAt).toDateString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// }

// export default AdminDashboard;