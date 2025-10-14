import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const ScenarioCard = styled.div`
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0.5rem;
`;

function Practical() {
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const res = await axios.get('/api/practicals');
        setScenarios(res.data);
      } catch (err) {
        alert(err.response?.data?.msg || 'Error');
      }
      setLoading(false);
    };
    fetchScenarios();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post('/api/practicals/submit', { scenarioId: selectedScenario._id, response });
      setSubmitted(true);
      setTimeout(() => navigate('/results/practical', { state: { type: 'practical', scenario: selectedScenario.title, response } }), 1500);
    } catch (err) {
      alert(err.response?.data?.msg || 'Submit error');
    }
  };

  if (loading) return <Container><p>Loading scenarios...</p></Container>;
  if (submitted) return <Container><p>Submitted! Redirecting...</p></Container>;

  return (
    <Container>
      <h1>Practical Logic Assessment</h1>
      <p>Select a scenario and provide a detailed response (paragraph form).</p>
      {scenarios.map((scen, idx) => (
        <ScenarioCard key={idx}>
          <h3>{scen.title}</h3>
          <p>{scen.description}</p>
          <button onClick={() => setSelectedScenario(scen)}>Select & Respond</button>
        </ScenarioCard>
      ))}
      {selectedScenario && (
        <div>
          <h3>Respond to: {selectedScenario.title}</h3>
          <TextArea
            placeholder="Explain your approach in detail: steps, tools, analysis, etc. (Min 50 chars)"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
          <Button onClick={handleSubmit} disabled={response.length < 50}>
            Submit Response
          </Button>
        </div>
      )}
    </Container>
  );
}

export default Practical;