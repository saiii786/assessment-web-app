import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const QuestionCard = styled.div`
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
`;

const OptionButton = styled.label`
  display: block;
  padding: 0.5rem;
  margin: 0.5rem 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  input { margin-right: 0.5rem; }
`;

const ProgressBar = styled.div`
  background: #ddd;
  height: 20px;
  border-radius: 10px;
  overflow: hidden;
  margin: 1rem 0;
`;

const ProgressFill = styled.div`
  background: #4caf50;
  height: 100%;
  transition: width 0.3s;
`;

const Timer = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: ${props => props.timeLeft < 300 ? 'red' : 'black'};
`;

function Quiz() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`/api/quizzes/${category}`);
        setQuestions(res.data);
      } catch (err) {
        alert(err.response?.data?.msg || 'Error fetching quiz');
      }
      setLoading(false);
    };
    fetchQuiz();
  }, [category]);

  useEffect(() => {
    if (timeLeft > 0 && !loading) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, loading]);

  const handleAnswer = (qIndex, optionIndex) => {
    setAnswers({ ...answers, [qIndex]: optionIndex });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/api/quizzes/submit', {
        category,
        answers: Object.entries(answers).map(([qIdx, selIdx]) => ({ questionIndex: parseInt(qIdx), selectedIndex: selIdx })),
      });
      navigate(`/results/${category}`, { state: res.data });
    } catch (err) {
      alert(err.response?.data?.msg || 'Submit error');
    }
  };

  if (loading) return <Container><p>Loading quiz...</p></Container>;
  if (questions.length === 0) return <Container><p>No questions for {category}</p></Container>;

  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    <Container>
      <h1>{category.toUpperCase()} Quiz</h1>
      <Timer timeLeft={timeLeft}>Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</Timer>
      <ProgressBar>
        <ProgressFill style={{ width: `${progress}%` }} />
      </ProgressBar>
      <QuestionCard>
        <h3>Q{currentQ + 1}: {questions[currentQ].text}</h3>
        {questions[currentQ].options.map((opt, idx) => (
          <OptionButton key={idx}>
            <input
              type="radio"
              name={`q${currentQ}`}
              checked={answers[currentQ] === idx}
              onChange={() => handleAnswer(currentQ, idx)}
            />
            {opt}
          </OptionButton>
        ))}
      </QuestionCard>
      <div>
        <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0}>
          Previous
        </button>
        <button onClick={() => currentQ < questions.length - 1 ? setCurrentQ(Math.min(questions.length - 1, currentQ + 1)) : handleSubmit()}>
          {currentQ < questions.length - 1 ? 'Next' : 'Submit'}
        </button>
      </div>
    </Container>
  );
}

export default Quiz;




// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import styled from 'styled-components';

// const Container = styled.div`
//   max-width: 600px;
//   margin: 2rem auto;
//   padding: 0 1rem;
// `;

// const QuestionCard = styled.div`
//   background: #f9f9f9;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   padding: 1rem;
//   margin: 1rem 0;
// `;

// const OptionButton = styled.label`
//   display: block;
//   padding: 0.5rem;
//   margin: 0.5rem 0;
//   background: white;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   cursor: pointer;
//   input { margin-right: 0.5rem; }
// `;

// const ProgressBar = styled.div`
//   background: #ddd;
//   height: 20px;
//   border-radius: 10px;
//   overflow: hidden;
//   margin: 1rem 0;
// `;

// const ProgressFill = styled.div`
//   background: #4caf50;
//   height: 100%;
//   transition: width 0.3s;
// `;

// const Timer = styled.div`
//   text-align: center;
//   font-size: 1.2rem;
//   color: ${props => props.timeLeft < 300 ? 'red' : 'black'}; // 5min = 300s
// `;

// function Quiz() {
//   const { category } = useParams(); // e.g., "aptitude"
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [currentQ, setCurrentQ] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(600); // 10 min
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const res = await axios.get(`/api/quizzes/${category}`);
//         setQuestions(res.data);
//       } catch (err) {
//         alert(err.response?.data?.msg || 'Error fetching quiz');
//       }
//       setLoading(false);
//     };
//     fetchQuiz();
//   }, [category]);

//   useEffect(() => {
//     if (timeLeft > 0 && !loading) {
//       const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
//       return () => clearInterval(timer);
//     } else if (timeLeft === 0) {
//       handleSubmit();
//     }
//   }, [timeLeft, loading]);

//   const handleAnswer = (qIndex, optionIndex) => {
//     setAnswers({ ...answers, [qIndex]: optionIndex });
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await axios.post('/api/quizzes/submit', {
//         category,
//         answers: Object.entries(answers).map(([qIdx, selIdx]) => ({ questionIndex: parseInt(qIdx), selectedIndex: selIdx })),
//       });
//       navigate(`/results/${category}`, { state: res.data });
//     } catch (err) {
//       alert(err.response?.data?.msg || 'Submit error');
//     }
//   };

//   if (loading) return <Container><p>Loading quiz...</p></Container>;
//   if (questions.length === 0) return <Container><p>No questions for {category}</p></Container>;

//   const progress = ((currentQ + 1) / questions.length) * 100;

//   return (
//     <Container>
//       <h1>{category.toUpperCase()} Quiz</h1>
//       <Timer timeLeft={timeLeft}>Time: {Math.floor(timeLeft / 60)}:{timeLeft % 60} </Timer>
//       <ProgressBar>
//         <ProgressFill style={{ width: `${progress}%` }} />
//       </ProgressBar>
//       <QuestionCard>
//         <h3>Q{currentQ + 1}: {questions[currentQ].text}</h3>
//         {questions[currentQ].options.map((opt, idx) => (
//           <OptionButton key={idx}>
//             <input
//               type="radio"
//               name={`q${currentQ}`}
//               checked={answers[currentQ] === idx}
//               onChange={() => handleAnswer(currentQ, idx)}
//             />
//             {opt}
//           </OptionButton>
//         ))}
//       </QuestionCard>
//       <div>
//         <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0}>
//           Previous
//         </button>
//         <button onClick={() => setCurrentQ(Math.min(questions.length - 1, currentQ + 1))}>
//           {currentQ < questions.length - 1 ? 'Next' : 'Submit'}
//         </button>
//         {currentQ === questions.length - 1 && (
//           <button onClick={handleSubmit} style={{ marginLeft: '1rem' }}>Submit Quiz</button>
//         )}
//       </div>
//     </Container>
//   );
// }

// export default Quiz;











