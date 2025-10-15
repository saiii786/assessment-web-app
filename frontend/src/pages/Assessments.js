import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Instructions = styled.p`
  background: #f8f9fa;
  padding: 1rem;
  border-left: 4px solid #007bff;
  margin-bottom: 2rem;
`;

const QuestionContainer = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f0f8ff;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const QuestionText = styled.h3`
  margin-bottom: 1rem;
  color: #333;
`;

const CodeBlock = styled.pre`
  background: #f4f4f4;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-family: monospace;
  margin-bottom: 1rem;
`;

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const OptionItem = styled.label`
  display: block;
  margin: 0.5rem 0;
  padding: 0.75rem;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  
  input[type="radio"] {
    margin-right: 0.5rem;
  }
  
  &:hover {
    background: #e6f3ff;
  }
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 1rem;
  
  &:hover {
    background: #218838;
  }
  
  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
`;

const ScoreContainer = styled.div`
  text-align: center;
  padding: 2rem;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  margin-top: 2rem;
`;

const ScoreText = styled.h2`
  color: #155724;
  margin-bottom: 0.5rem;
`;

const questions = [
  // Fundamentals (1-15)
  {
    id: 1,
    question: "Who is the father of C language?",
    options: [
      "A) Steve Jobs",
      "B) James Gosling",
      "C) Dennis Ritchie",
      "D) Rasmus Lerdorf"
    ],
    correct: 2
  },
  {
    id: 2,
    question: "Which of the following is not a valid C variable name?",
    options: [
      "A) int number;",
      "B) float rate;",
      "C) int variable_count;",
      "D) int $main;"
    ],
    correct: 3
  },
  {
    id: 3,
    question: "All keywords in C are in ____________",
    options: [
      "A) LowerCase letters",
      "B) UpperCase letters",
      "C) CamelCase letters",
      "D) None of the mentioned"
    ],
    correct: 0
  },
  {
    id: 4,
    question: "Which of the following is true for variable names in C?",
    options: [
      "A) They can contain alphanumeric characters as well as special characters",
      "B) It is not an error to declare a variable to be one of the keywords(like goto, static)",
      "C) Variable names cannot start with a digit",
      "D) Variable can be of any length"
    ],
    correct: 2
  },
  {
    id: 5,
    question: "Which is valid C expression?",
    options: [
      "A) int my_num = 100,000;",
      "B) int my_num = 100000;",
      "C) int my num = 1000;",
      "D) int $my_num = 10000;"
    ],
    correct: 1
  },
  {
    id: 6,
    question: "Which of the following cannot be a variable name in C?",
    options: [
      "A) volatile",
      "B) true",
      "C) friend",
      "D) export"
    ],
    correct: 0
  },
  {
    id: 7,
    question: "What is short int in C programming?",
    options: [
      "A) The basic data type of C",
      "B) Qualifier",
      "C) Short is the qualifier and int is the basic data type",
      "D) All of the mentioned"
    ],
    correct: 2
  },
  {
    id: 8,
    question: "Which of the following declaration is not supported by C language?",
    options: [
      "A) String str;",
      "B) char *str;",
      "C) float str = 3e2;",
      "D) Both “String str;” and “float str = 3e2;\""
    ],
    correct: 3
  },
  {
    id: 9,
    question: "Which keyword is used to prevent any changes in the variable within a C program?",
    options: [
      "A) immutable",
      "B) mutable",
      "C) const",
      "D) volatile"
    ],
    correct: 2
  },
  {
    id: 10,
    question: "What is the result of logical or relational expression in C?",
    options: [
      "A) True or False",
      "B) 0 or 1",
      "C) 0 if an expression is false and any positive number if an expression is true",
      "D) None of the mentioned"
    ],
    correct: 1
  },
  {
    id: 11,
    question: "Which of the following typecasting is accepted by C language?",
    options: [
      "A) Widening conversions",
      "B) Narrowing conversions",
      "C) Widening & Narrowing conversions",
      "D) None of the mentioned"
    ],
    correct: 2
  },
  {
    id: 12,
    question: "Where in C the order of precedence of operators do not exist?",
    options: [
      "A) Within conditional statements, if, else",
      "B) Within while, do-while",
      "C) Within a macro definition",
      "D) None of the mentioned"
    ],
    correct: 3
  },
  {
    id: 13,
    question: "Which of the following is NOT possible with any 2 operators in C?",
    options: [
      "A) Different precedence, same associativity",
      "B) Different precedence, different associativity",
      "C) Same precedence, different associativity",
      "D) All of the mentioned"
    ],
    correct: 2
  },
  {
    id: 14,
    question: "What is an example of iteration in C?",
    options: [
      "A) for",
      "B) while",
      "C) do-while",
      "D) all of the mentioned"
    ],
    correct: 3
  },
  {
    id: 15,
    question: "Functions can return enumeration constants in C?",
    options: [
      "A) true",
      "B) false",
      "C) depends on the compiler",
      "D) depends on the standard"
    ],
    correct: 0
  },
  // Real-time Problems (16-30)
  {
    id: 16,
    question: "What will be the result of the following code snippet?\n\n#include <stdio.h>\nvoid solve() {\n    char ch[10] = \"abcdefghij\";\n    int ans = 0;\n    for(int i = 0; i < 10; i++) {\n        ans += (ch[i] - 'a');\n    }\n    printf(\"%d\", ans);\n}\nint main() {\n    solve();\n\treturn 0;\n}",
    options: [
      "A) 45",
      "B) 0",
      "C) 225",
      "D) 55"
    ],
    correct: 0,
    isCode: true
  },
  {
    id: 17,
    question: "What will be the output of the following code snippet?\n\n#include <stdio.h>\nstruct School {\n    int age, rollNo;\n};\nvoid solve() {\n    struct School sc;\n    sc.age = 19;\n    sc.rollNo = 82;\n    printf(\"%d %d\", sc.age, sc.rollNo);\n}\nint main() {\n    solve();\n\treturn 0;\n}",
    options: [
      "A) 19 82",
      "B) 82 19",
      "C) 101",
      "D) Garbage values"
    ],
    correct: 0,
    isCode: true
  },
  {
    id: 18,
    question: "What will be the output of the following code snippet?\n\n#include <stdio.h>\nvoid solve() {\n    int a[] = {1, 2, 3, 4, 5};\n    int sum = 0;\n    for(int i = 0; i < 5; i++) {\n        if(i % 2 == 0) {\n            sum += *(a + i);\n        }\n        else {\n            sum -= *(a + i);\n        }\n    }\n    printf(\"%d\", sum);\n}\nint main() {\n\tsolve();\n\treturn 0;\n}",
    options: [
      "A) 5",
      "B) -1",
      "C) 1",
      "D) 15"
    ],
    correct: 1,
    isCode: true
  },
  {
    id: 19,
    question: "What will be the output of the following code snippet?\n\n#include <stdio.h>\nvoid solve() {\n    int x = 2;\n    printf(\"%d\", (x << 1) + (x >> 1));\n}\nint main() {\n    solve();\n\treturn 0;\n}",
    options: [
      "A) 3",
      "B) 4",
      "C) 2",
      "D) 5"
    ],
    correct: 0,
    isCode: true
  },
  {
    id: 20,
    question: "What will be the output of the following code snippet?\n\n#include <stdio.h>\n#define VAL 5\nint getInput() {\n    return VAL;\n}\nvoid solve() {\n    const int x = getInput();\n    printf(\"%d\", x);\n}\nint main() {\n    solve();\n\treturn 0;\n}",
    options: [
      "A) 5",
      "B) 0",
      "C) Garbage value",
      "D) Compilation error"
    ],
    correct: 0,
    isCode: true
  },
  {
    id: 21,
    question: "What will be the output of the following code snippet?\n\n#include <stdio.h>\n#define CUBE(x) x * x * x\nvoid solve() {\n    int ans = 216 / CUBE(3);\n    printf(\"%d\", ans);\n}\nint main() {\n    solve();\n\treturn 0;\n}",
    options: [
      "A) 8",
      "B) 6",
      "C) 24",
      "D) 216"
    ],
    correct: 1,
    isCode: true
  },
  {
    id: 22,
    question: "What will be the output of the following code snippet?\n\n#include <stdio.h>\nvoid solve() {\n    int n = 24;\n    int l = 0, r = 100, ans = n;\n    while(l <= r) {\n        int mid = (l + r) / 2;\n        if(mid * mid <= n) {\n            ans = mid;\n            l = mid + 1;\n        }\n        else {\n            r = mid - 1;\n        }\n    }\n    printf(\"%d\", ans);\n}\nint main() {\n    solve();\n\treturn 0;\n}",
    options: [
      "A) 4",
      "B) 5",
      "C) 24",
      "D) 100"
    ],
    correct: 1,
    isCode: true
  },
  {
    id: 23,
    question: "What will be the output of the following code snippet?\n\n#include <stdio.h>\nvoid solve() {\n    int x = 1, y = 2;\n    printf(x > y ? \"Greater\" : x == y ? \"Equal\" : \"Lesser\");\n}\nint main() {\n    solve();\n\treturn 0;\n}",
    options: [
      "A) Greater",
      "B) Equal",
      "C) Lesser",
      "D) Compilation error"
    ],
    correct: 2,
    isCode: true
  },
  {
    id: 24,
    question: "What will be the output of the following code snippet?\n\n#include <stdio.h>\nvoid solve() {\n    printf(\"%d \", 9 / 2);\n    printf(\"%f\", 9.0 / 2);\n}\nint main() {\n    solve();\n\treturn 0;\n}",
    options: [
      "A) 4 4.500000",
      "B) 4.5 4.500000",
      "C) 4 4.5",
      "D) 4.5 4.5"
    ],
    correct: 2,
    isCode: true
  },
  {
    id: 25,
    question: "What will be the output of the following code snippet?\n\n#include <stdio.h>\nvoid solve() {\n    int first = 10, second = 20;\n    int third = first + second;\n    {\n        int third = second - first;\n        printf(\"%d \", third);\n    }\n    printf(\"%d\", third);\n}\nint main() {\n\tsolve();\n\treturn 0;\n}",
    options: [
      "A) 10 30",
      "B) 30 10",
      "C) 10 10",
      "D) Compilation error"
    ],
    correct: 0,
    isCode: true
  },
  {
    id: 26,
    question: "What will be the output of the following code snippet?\n\n#include <stdio.h>\nvoid solve() {\n    bool ok = false;\n    printf(ok ? \"YES\" : \"NO\");\n}\nint main() {\n    solve();\n\treturn 0;\n}",
    options: [
      "A) YES",
      "B) NO",
      "C) Compilation error",
      "D) Garbage value"
    ],
    correct: 2,
    isCode: true
  },
  {
    id: 27,
    question: "What will be the output of the following code snippet?\n\n#include <stdio.h>\n#define VAL 3 * (2 + 6)\nvoid solve() {\n    int a = 10 + VAL;\n    printf(\"%d\", a);\n}\nint main() {\n\tsolve();\n\treturn 0;\n}",
    options: [
      "A) 36",
      "B) 24",
      "C) 10",
      "D) 28"
    ],
    correct: 0,
    isCode: true
  },
  {
    id: 28,
    question: "What will be the output of the following code snippet?\n\n#include <stdio.h>\nint main() {\n\tint a = 3, b = 5;\n\tint t = a;\n\ta = b;\n\tb = t;\n\tprintf(\"%d %d\", a, b);\n\treturn 0;\n}",
    options: [
      "A) 3 5",
      "B) 5 3",
      "C) 8 8",
      "D) Garbage values"
    ],
    correct: 1,
    isCode: true
  },
  {
    id: 29,
    question: "What will be the output of the following code snippet?\n\n#include <stdio.h>\nvoid solve() {\n    int ch = 2;\n    switch(ch) {\n        case 1: printf(\"1 \");\n        case 2: printf(\"2 \");\n        case 3: printf(\"3 \");\n        default: printf(\"None\");\n    }\n}\nint main() {\n    solve();\n\treturn 0;\n}",
    options: [
      "A) 2",
      "B) 2 3 None",
      "C) 1 2 3",
      "D) None"
    ],
    correct: 1,
    isCode: true
  },
  {
    id: 30,
    question: "What will be the value of x in the following code snippet?\n\n#include <stdio.h>\nvoid solve() {\n    int x = printf(\"Hello\");\n    printf(\" %d\", x);\n}\nint main() {\n\tsolve();\n\treturn 0;\n}",
    options: [
      "A) 5",
      "B) 6",
      "C) Hello 5",
      "D) Compilation error"
    ],
    correct: 0,
    isCode: true
  }
];

function Assessments() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleOptionSelect = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setSubmitted(true);
  };

  const isComplete = questions.every(q => selectedAnswers[q.id] !== undefined);

  if (submitted) {
    return (
      <Container>
        <Header>
          <h1>Quiz Complete!</h1>
        </Header>
        <ScoreContainer>
          <ScoreText>Your Score: {score} / {questions.length}</ScoreText>
          <p>
            {score === questions.length ? 'Perfect! You nailed the CSE fundamentals.' : 
             score >= 25 ? 'Excellent! Strong grasp on C programming.' : 
             score >= 20 ? 'Good job! Keep practicing real-time problems.' : 
             score >= 15 ? 'Fair performance. Review basics and outputs.' : 
             'Better luck next time. Focus on fundamentals.'}
          </p>
          <SubmitButton onClick={() => window.location.reload()}>Retake Quiz</SubmitButton>
        </ScoreContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h1>CSE Fresher Programming Fundamentals Assessment</h1>
        <p>(30 Questions: 15 Fundamentals + 15 Real-Time Problems)</p>
      </Header>
      <Instructions>
        Answer the following 30 MCQ questions on C Programming Fundamentals. The first 15 are basic concepts, and the next 15 are real-time problem-solving scenarios (e.g., output prediction, debugging). Select one option per question. This simulates a real interview test—good luck!
      </Instructions>
      {questions.map(q => (
        <QuestionContainer key={q.id}>
          <QuestionText>Question {q.id}: {q.question}</QuestionText>
          {q.isCode && <CodeBlock>{q.question}</CodeBlock>}
          <OptionsList>
            {q.options.map((opt, index) => (
              <OptionItem key={index}>
                <input
                  type="radio"
                  name={`q${q.id}`}
                  value={index}
                  checked={selectedAnswers[q.id] === index}
                  onChange={() => handleOptionSelect(q.id, index)}
                />
                {opt}
              </OptionItem>
            ))}
          </OptionsList>
        </QuestionContainer>
      ))}
      <SubmitButton onClick={handleSubmit} disabled={!isComplete}>
        {isComplete ? 'Submit Quiz' : `Complete all questions to submit (${Object.keys(selectedAnswers).length}/30)`}
      </SubmitButton>
    </Container>
  );
}

export default Assessments;





// import React from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';

// const Container = styled.div`
//   max-width: 800px;
//   margin: 2rem auto;
//   padding: 0 1rem;
// `;

// const CategoryList = styled.ul`
//   list-style: none;
//   padding: 0;
// `;

// const CategoryItem = styled.li`
//   margin: 1rem 0;
// `;

// const CategoryLink = styled(Link)`
//   display: block;
//   padding: 1rem;
//   background: #f0f8ff;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   text-decoration: none;
//   color: #333;
//   &:hover { background: #e6f3ff; }
// `;

// const categories = [
//   'aptitude', 'vocabulary', 'numerical-reasoning', 'verbal-reasoning',
//   'logical-reasoning', 'abstract-reasoning', 'programming-fundamentals'
// ];

// function Assessments() {
//   return (
//     <Container>
//       <h1>Assessments</h1>
//       <p>Select a category to start the MCQ quiz (5 questions each).</p>
//       <CategoryList>
//         {categories.map(cat => (
//           <CategoryItem key={cat}>
//             <CategoryLink to={`/quiz/${cat}`}>
//               {typeof cat === 'string' ? cat.replace(/-/g, ' ').toUpperCase() : cat} {/* Safe replace only on display */}
//             </CategoryLink>
//           </CategoryItem>
//         ))}
//       </CategoryList>
//       {/* Add Practical link from Task 5 */}
//       <div style={{ marginTop: '2rem' }}>
//         <CategoryLink to="/practical">Practical Logic Scenarios</CategoryLink>
//       </div>
//     </Container>
//   );
// }

// export default Assessments;





// import React from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';

// const Container = styled.div`
//   max-width: 800px;
//   margin: 2rem auto;
//   padding: 0 1rem;
// `;

// const CategoryList = styled.ul`
//   list-style: none;
//   padding: 0;
// `;

// const CategoryItem = styled.li`
//   margin: 1rem 0;
// `;

// const CategoryLink = styled(Link)`
//   display: block;
//   padding: 1rem;
//   background: #f0f8ff;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   text-decoration: none;
//   color: #333;
//   &:hover { background: #e6f3ff; }
// `;

// const categories = [
//   'aptitude', 'vocabulary', 'numerical-reasoning', 'verbal-reasoning',
//   'logical-reasoning', 'abstract-reasoning', 'programming-fundamentals',
//   <div style={{ marginTop: '2rem' }}>
//   <CategoryLink to="/practical">Practical Logic Scenarios</CategoryLink>
// </div>
// ];


// function Assessments() {
//   return (
//     <Container>
//       <h1>Assessments</h1>
//       <p>Select a category to start the MCQ quiz (5 questions each).</p>
//       <CategoryList>
//         {categories.map(cat => (
//           <CategoryItem key={cat}>
//             <CategoryLink to={`/quiz/${cat.replace('-', ' ')}`}>{cat.replace('-', ' ').toUpperCase()}</CategoryLink>
//           </CategoryItem>
//         ))}
//       </CategoryList>
//     </Container>
//   );
// }

// export default Assessments;