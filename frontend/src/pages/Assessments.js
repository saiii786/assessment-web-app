import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const CategoryTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${props => props.active ? '#007bff' : '#f0f8ff'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #e6f3ff;
  }
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

// Questions data - 25 per category, 12-13 basic/fundamentals, 12-13 real-time/problems
const questionsData = {
  aptitude: [
    // Basic (1-13)
    { id: 1, question: "What is the formula for Profit Percentage?", options: ["A) (SP / CP) * 100", "B) ((SP – CP) / CP) * 100", "C) (CP / SP) * 100", "D) ((CP – SP) / SP) * 100"], correct: 1 },
    { id: 2, question: "How do you calculate Simple Interest (SI)?", options: ["A) (P * R * T) * 100", "B) (P * R / T) / 100", "C) (P * R * T) / 100", "D) P * (1 + R/100)^T"], correct: 2 },
    { id: 3, question: "What is the formula for Compound Interest (CI)?", options: ["A) (P * R * T) / 100", "B) Amount – P, where Amount = P * (1 + R/100)^T", "C) ((SP – CP) / CP) * 100", "D) Sum of Observations / Number of Observations"], correct: 1 },
    { id: 4, question: "How do you find the average of a set of numbers?", options: ["A) Sum of Observations * Number of Observations", "B) Sum of Observations / Number of Observations", "C) (Sum of Observations – Number of Observations) / 100", "D) Product of Observations / Number of Observations"], correct: 1 },
    { id: 5, question: "What is the formula for Time, Speed, and Distance?", options: ["A) Speed = Time / Distance", "B) Distance = Speed * Time", "C) Speed = Distance / Time", "D) Time = Speed + Distance"], correct: 2 },
    { id: 6, question: "What is the rule for divisibility by 3?", options: ["A) The number itself must be divisible by 3", "B) The sum of its digits is divisible by 3", "C) The last digit is 3", "D) The product of digits is divisible by 3"], correct: 1 },
    { id: 7, question: "What is the rule for divisibility by 9?", options: ["A) The sum of its digits is divisible by 9", "B) The last two digits form a number divisible by 9", "C) The number is odd", "D) The product of digits is divisible by 9"], correct: 0 },
    { id: 8, question: "How do you find the area of a circle?", options: ["A) π * r", "B) 2 * π * r", "C) π * r²", "D) π / r²"], correct: 2 },
    { id: 9, question: "What is the probability of getting a head when a coin is tossed?", options: ["A) 1/4", "B) 1/3", "C) 1/2", "D) 1"], correct: 2 },
    { id: 10, question: "What is n! (n factorial)?", options: ["A) Sum of integers up to n", "B) Product of all positive integers up to n", "C) n divided by (n-1)", "D) n squared"], correct: 1 },
    { id: 11, question: "What is the formula for the sum of the first ‘n’ natural numbers?", options: ["A) n(n+1) / 2", "B) n² / 2", "C) n(n-1) / 2", "D) n * (n+1)"], correct: 0 },
    { id: 12, question: "What is a prime number?", options: ["A) A number divisible by 1 and itself only, greater than 1", "B) An even number greater than 2", "C) A number with exactly three divisors", "D) The sum of two primes"], correct: 0 },
    { id: 13, question: "Find the next number in the series: 2, 5, 10, 17, 26, ?", options: ["A) 35", "B) 37", "C) 39", "D) 41"], correct: 1 },
    // Real-time (14-25)
    { id: 14, question: "A man buys an item for Rs. 500 and sells it for Rs. 600. Find the profit percent.", options: ["A) 10%", "B) 15%", "C) 20%", "D) 25%"], correct: 2 },
    { id: 15, question: "Find the average of the first 50 natural numbers.", options: ["A) 20", "B) 25", "C) 25.5", "D) 30"], correct: 2 },
    { id: 16, question: "A car travels 300 km in 5 hours. What is its speed?", options: ["A) 50 km/hr", "B) 60 km/hr", "C) 70 km/hr", "D) 80 km/hr"], correct: 1 },
    { id: 17, question: "If A can do a job in 10 days and B can do it in 15 days, how long will they take together?", options: ["A) 5 days", "B) 6 days", "C) 7 days", "D) 8 days"], correct: 1 },
    { id: 18, question: "Two numbers are in the ratio 3:5. If their sum is 80, find the numbers.", options: ["A) 20 and 60", "B) 30 and 50", "C) 40 and 40", "D) 25 and 55"], correct: 1 },
    { id: 19, question: "How many ways can the letters of the word ‘LEADER’ be arranged?", options: ["A) 300", "B) 360", "C) 720", "D) 120"], correct: 1 },
    { id: 20, question: "Find the HCF of 50 and 75.", options: ["A) 15", "B) 20", "C) 25", "D) 50"], correct: 2 },
    { id: 21, question: "If ‘ROSE’ is coded as ‘TQUG’, how is ‘BLUE’ coded?", options: ["A) DNWG", "B) CPVF", "C) EMXH", "D) AKSD"], correct: 0 },
    { id: 22, question: "A man walks 5 km East, then 5 km South. Where is he now from his starting point?", options: ["A) 5 km North", "B) 5√2 km South-East", "C) 10 km East", "D) 5 km West"], correct: 1 },
    { id: 23, question: "In a row of 15 children, Rajan is 5th from the left. What is his position from the right?", options: ["A) 10th", "B) 11th", "C) 12th", "D) 9th"], correct: 1 },
    { id: 24, question: "At what time between 3 and 4 o’clock are the hands of a clock together?", options: ["A) 16 minutes past 3", "B) 16 4/11 minutes past 3", "C) 15 minutes past 3", "D) 17 minutes past 3"], correct: 1 },
    { id: 25, question: "All pens are pencils. All pencils are books. What is the conclusion?", options: ["A) Some pens are books", "B) All pens are books", "C) No pens are books", "D) All books are pens"], correct: 1 }
  ],
  vocabulary: [
    // Basic (1-13) - Supplemented with standard MCQs based on common job interview vocab
    { id: 1, question: "What is the synonym of 'ambiguous'?", options: ["A) Clear", "B) Unclear", "C) Precise", "D) Definite"], correct: 1 },
    { id: 2, question: "What is the antonym of 'meticulous'?", options: ["A) Careful", "B) Sloppy", "C) Detailed", "D) Thorough"], correct: 1 },
    { id: 3, question: "Choose the word that means 'a sudden strong feeling'?", options: ["A) Impulse", "B) Hesitation", "C) Delay", "D) Plan"], correct: 0 },
    { id: 4, question: "What is the synonym of 'proficient'?", options: ["A) Incompetent", "B) Skilled", "C) Beginner", "D) Lazy"], correct: 1 },
    { id: 5, question: "Antonym of 'abundant'?", options: ["A) Plentiful", "B) Scarce", "C) Rich", "D) Full"], correct: 1 },
    { id: 6, question: "Word for 'a person who is new to a job'?", options: ["A) Veteran", "B) Novice", "C) Expert", "D) Leader"], correct: 1 },
    { id: 7, question: "Synonym of 'diligent'?", options: ["A) Lazy", "B) Hardworking", "C) Careless", "D) Idle"], correct: 1 },
    { id: 8, question: "Antonym of 'innovative'?", options: ["A) Creative", "B) Traditional", "C) Original", "D) New"], correct: 1 },
    { id: 9, question: "Meaning of 'resilient'?", options: ["A) Fragile", "B) Tough", "C) Weak", "D) Soft"], correct: 1 },
    { id: 10, question: "Synonym of 'concise'?", options: ["A) Wordy", "B) Brief", "C) Long", "D) Verbose"], correct: 1 },
    { id: 11, question: "Antonym of 'coherent'?", options: ["A) Logical", "B) Incoherent", "C) Clear", "D) Consistent"], correct: 1 },
    { id: 12, question: "Word for 'ability to understand and share feelings'?", options: ["A) Empathy", "B) Apathy", "C) Sympathy", "D) Indifference"], correct: 0 },
    { id: 13, question: "Synonym of 'meticulous'?", options: ["A) Careless", "B) Precise", "C) Sloppy", "D) Rough"], correct: 1 },
    // Real-time (14-25) - Application in sentences
    { id: 14, question: "Choose the word that best fits: 'The manager's _____ approach led to efficient team work.'", options: ["A) Chaotic", "B) Collaborative", "C) Isolated", "D) Competitive"], correct: 1 },
    { id: 15, question: "In a resume, 'versatile' means?", options: ["A) Rigid", "B) Adaptable", "C) Fixed", "D) Stubborn"], correct: 1 },
    { id: 16, question: "Best word for 'quick to understand' in interview context?", options: ["A) Dull", "B) Perceptive", "C) Slow", "D) Ignorant"], correct: 1 },
    { id: 17, question: "Antonym for 'assertive' in leadership?", options: ["A) Confident", "B) Timid", "C) Bold", "D) Strong"], correct: 1 },
    { id: 18, question: "Meaning of 'proactive' in job description?", options: ["A) Reactive", "B) Initiative-taking", "C) Passive", "D) Waiting"], correct: 1 },
    { id: 19, question: "Synonym of 'reliable'?", options: ["A) Untrustworthy", "B) Dependable", "C) Unpredictable", "D) Volatile"], correct: 1 },
    { id: 20, question: "Word for 'working well with others'?", options: ["A) Solitary", "B) Team player", "C) Independent", "D) Lone wolf"], correct: 1 },
    { id: 21, question: "Antonym of 'innovative' in creative roles?", options: ["A) Original", "B) Conventional", "C) Creative", "D) Novel"], correct: 1 },
    { id: 22, question: " 'Resilient' in stress management?", options: ["A) Fragile", "B) Bouncing back", "C) Breaking", "D) Giving up"], correct: 1 },
    { id: 23, question: "Synonym of 'eloquent' for communication skills?", options: ["A) Tongue-tied", "B) Articulate", "C) Silent", "D) Mute"], correct: 1 },
    { id: 24, question: "Meaning of 'meticulous' in detail-oriented jobs?", options: ["A) Careless", "B) Attentive to detail", "C) Hasty", "D) Sloppy"], correct: 1 },
    { id: 25, question: "Best fit for 'adaptable' in dynamic environments?", options: ["A) Rigid", "B) Flexible", "C) Fixed", "D) Static"], correct: 1 }
  ],
  'numerical-reasoning': [
    // Basic (1-15) from Testbook
    { id: 1, question: "A family consists of a couple, their three sons and two daughters. The elder of the two sons who got married was blessed with two daughters. How many females are there in the family?", options: ["A) 4", "B) 5", "C) 7", "D) 6"], correct: 3 },
    { id: 2, question: "If E = 10; J = 20; O = 30; and T = 40, what will be P + E + S + T?", options: ["A) 51", "B) 82", "C) 120", "D) 164"], correct: 2 },
    { id: 3, question: "There are five buildings called V, W, X, Y and Z in a row. V is to the West of W. Z is to the East of X and the West of V. W is to the West of Y. Which is the building in the middle?", options: ["A) V", "B) W", "C) X", "D) Y"], correct: 0 },
    { id: 4, question: "If yesterday was a Sunday, what would be the 81st day from today?", options: ["A) Wednesday", "B) Tuesday", "C) Thursday", "D) Friday"], correct: 3 },
    { id: 5, question: "If a and b are integers and a – b is even, which of the following must always be even?", options: ["A) ab", "B) a² + b² + 1", "C) a² + b + 1", "D) ab – b"], correct: 3 },
    { id: 6, question: "If ROAD is written as URDG, then SWAN should be written as:", options: ["A) VXDQ", "B) VZDQ", "C) VZDP", "D) UXDQ"], correct: 1 },
    { id: 7, question: "If 0, 1, 2, ……., 7, 8, 9 are coded as O, P, Q, … V, W, X then 45 will be coded as:", options: ["A) TS", "B) ST", "C) SS", "D) SU"], correct: 1 },
    { id: 8, question: "Rashi, Shalu, Megha and Reeta are sitting along with a rectangular table. Rashi is to the right of Shalu. Megha is to the left of Reeta. Which of the person given in the option is sitting opposite to each other?", options: ["A) Shalu - Reeta", "B) Rashi - Reeta", "C) Rashi - Shalu", "D) Megha - Rashi"], correct: 1 },
    { id: 9, question: "The minimum number of straight lines required to connect the nine points above without lifting the pen or retracing is", options: ["A) 3", "B) 4", "C) 5", "D) 6"], correct: 1 },
    { id: 10, question: "Comparing numerical values, which of the following is different from the rest?", options: ["A) The ratio of the circumference of a circle to its diameter.", "B) The sum of the three angles of a plane triangle expressed in radians.", "C) 22/7.", "D) The net volume of a hemisphere of unit radius, and a cone of unit radius and unit height."], correct: 2 },
    { id: 11, question: "In how many numbers, the digit group \"37\" appears (from 1001 to 9999)?", options: ["A) 270", "B) 279", "C) 280", "D) 299"], correct: 2 },
    { id: 12, question: "The least number of squares that must be added so that the line P - Q becomes the line of symmetry is ____", options: ["A) 6", "B) 4", "C) 7", "D) 3"], correct: 0 },
    { id: 13, question: "If 0, 1, 2 are coded as O, P, Q, then for basic extension, 3 codes as:", options: ["A) R", "B) S", "C) T", "D) U"], correct: 0 },
    { id: 14, question: "Basic family count: A couple has 2 sons and 1 daughter. How many males?", options: ["A) 2", "B) 3", "C) 1", "D) 4"], correct: 1 },
    { id: 15, question: "If today is Monday, what day is 7 days from now?", options: ["A) Monday", "B) Tuesday", "C) Sunday", "D) Wednesday"], correct: 0 },
    // Applied (16-25) - Supplemented from response
    { id: 16, question: "Find a single discount equivalent to a series of discounts 10%, 20% and 30%.", options: ["A) 49.6%", "B) 48.7%", "C) 49.7%", "D) 48.6%"], correct: 0 },
    { id: 17, question: "5 skilled workers can build a wall in 20 days; 8 semi-skilled in 25 days; 10 unskilled in 30 days. Team: 2 skilled, 6 semi, 5 unskilled, time?", options: ["A) 20 days", "B) 18 days", "C) 16 days", "D) 15 days"], correct: 3 },
    { id: 18, question: "5 bags with 10 distinct chocolates each. Pick one from each, probability at least two identical?", options: ["A) 0.8125", "B) 0.6976", "C) 0.3024", "D) 0.4235"], correct: 1 },
    { id: 19, question: "In four-digit numbers from 1001 to 9999, the digit group \"37\" appears how many times?", options: ["A) 270", "B) 279", "C) 280", "D) 299"], correct: 2 },
    { id: 20, question: "For discounts 20% and 10% successive, equivalent single discount?", options: ["A) 28%", "B) 30%", "C) 32%", "D) 25%"], correct: 0 },
    { id: 21, question: "3 workers build wall in 15 days, 5 in 9 days. Combined 2+3 workers time?", options: ["A) 6 days", "B) 5 days", "C) 7 days", "D) 4 days"], correct: 0 },
    { id: 22, question: "Probability of at least one match in 3 bags of 5 distinct items picked one each.", options: ["A) 0.4", "B) 0.6", "C) 0.8", "D) 0.2"], correct: 1 },
    { id: 23, question: "For 4x4 grid, minimum lines to connect without lifting pen.", options: ["A) 6", "B) 7", "C) 5", "D) 8"], correct: 1 },
    { id: 24, question: "If a-b even, a+b even or odd? Must be:", options: ["A) Even", "B) Odd", "C) Either", "D) Always odd"], correct: 0 },
    { id: 25, question: "Series discounts 15%, 15%. Equivalent single?", options: ["A) 22.5%", "B) 30%", "C) 20%", "D) 25%"], correct: 0 }
  ],
  'verbal-reasoning': [
    // Basic (1-15) from Testbook
    { id: 1, question: "Three of the following four words are alike in a certain way and one is different. Select the odd one.", options: ["A) Goggles", "B) Spectacles", "C) Bifocals", "D) Optical Reader"], correct: 3 },
    { id: 2, question: "Three of the following four words are alike in a certain way and one is different. Pick the odd one out.", options: ["A) Hendecagon", "B) Hexagon", "C) Heptagon", "D) Pentagon"], correct: 1 },
    { id: 3, question: "In the following question, select the related word pair from the given alternatives: Tuberculosis : Lungs :: Typhoid : ?", options: ["A) Liver", "B) Intestine", "C) Lungs", "D) Brain"], correct: 1 },
    { id: 4, question: "X introduces Y saying, “He is the husband of the grand daughter of the father of my father”. How is Y related to X?", options: ["A) brother", "B) uncle", "C) co-brother", "D) brother-in-law"], correct: 3 },
    { id: 5, question: "Select the option that is related to the third term in the same way as the second term is related to the first term. IVORY : ZWSPJ :: CREAM : ?", options: ["A) NFDQB", "B) SNFDB", "C) DSFCN", "D) BQDZL"], correct: 1 },
    { id: 6, question: "Select the number-pair from the given options where the first number is NOT related to the second number as in the given number-pair: 4 : 8", options: ["A) 8 : 32", "B) 2 : 2", "C) 3 : 9", "D) 6 : 18"], correct: 2 },
    { id: 7, question: "Study the given pattern carefully and select the number that can replace the question mark (?) in it. First row - 67, 25, 101; Second row - 55, 17, 97; Third row - 45, 19, ?", options: ["A) 67", "B) 72", "C) 92", "D) 59"], correct: 3 },
    { id: 8, question: "“தகளி” என்ற சொல்லின் பொருள் _____ ஆகும்.", options: ["A) மின் விளக்கு", "B) குழல் விளக்கு", "C) அகல் விளக்கு", "D) பாவை விளக்கு"], correct: 2 },
    { id: 9, question: "விடுபட்ட எண்ணை கண்டுபிடிக்கவும். 11, 10, ?, 100, 1001, 1000, 10001", options: ["A) 101", "B) 110", "C) 111", "D) 1111"], correct: 0 },
    { id: 10, question: "600 இன் x % என்பது 450 எனில், x இன் மதிப்பு?", options: ["A) 75", "B) 60", "C) 35", "D) 70"], correct: 0 },
    { id: 11, question: "How many triangles are there in the given figure?", options: ["A) 13", "B) 32", "C) 21", "D) 24"], correct: 3 },
    { id: 12, question: "Select the option that is related to the fifth number in the same way as the second number is related to the first number and fourth number is related to third number. 139 : 228 :: 122 : 211 :: 2 : ?", options: ["A) 91", "B) 198", "C) 89", "D) 189"], correct: 0 },
    { id: 13, question: "The sequence of folding a piece of paper and cutting is shown. Select the unfolded form.", options: ["A) Figure A", "B) Figure B", "C) Figure C", "D) Figure D"], correct: 2 },
    { id: 14, question: "Three of the following four words are alike in a certain way and one is different. Select the odd one. (Based on disease analogy extension.)", options: ["A) Pneumonia", "B) Jaundice", "C) Typhoid", "D) Rabies"], correct: 2 },
    { id: 15, question: "Select the related pair: Lungs : Tuberculosis :: Liver : ?", options: ["A) Pneumonia", "B) Jaundice", "C) Typhoid", "D) Rabies"], correct: 1 },
    // Advanced (16-25) from response
    { id: 16, question: "விவாதம் – அவன் உச்ச மதிப்பீடுக் குறியீடு மதிப்பெண் பெற்றால் உதவித் தொகை பெறுவான். அவன் உதவித் தொகை பெற்றுள்ளான் என்றால், உச்ச மதிப்பீடுக் குறியீடு மதிப்பெண் பெற்றிருப்பான். இந்த விவாதம்", options: ["A) சரியானது", "B) தவறானது", "C) சந்தேகத்திற்குரியது", "D) தீர்வின்றி போவது"], correct: 1 },
    { id: 17, question: "பொருத்துக. I. கூட்டு வட்டி a. xy = K II. தள்ளுபடி b. y = Kx III. நேர் மாறல் c. குறித்த விலை - விற்பனை விலை IV. எதிர் மாறல் d. A = P (1 + r/100)^n", options: ["A) c d b a", "B) d c a b", "C) d c b a", "D) c d a b"], correct: 2 },
    { id: 18, question: "Select the option that would most closely resemble the unfolded form of the cut paper (advanced folding with multiple cuts).", options: ["A) Symmetric cuts on all sides", "B) Asymmetric diagonal cuts", "C) Central hole with edges", "D) Full perimeter cuts"], correct: 0 },
    { id: 19, question: "In a family tree, if Z is the son of the only daughter of X's brother, how is Z related to X?", options: ["A) Nephew", "B) Son", "C) Grandson", "D) Uncle"], correct: 0 },
    { id: 20, question: "Tuberculosis : Lungs :: Typhoid : Intestine :: Rabies : ?", options: ["A) Liver", "B) Brain", "C) Heart", "D) Kidney"], correct: 1 },
    { id: 21, question: "Select the number-pair NOT related as 139 : 228 (advanced operation: difference of 89, but with twist).", options: ["A) 122 : 211", "B) 2 : 91", "C) 300 : 389", "D) 50 : 139"], correct: 3 },
    { id: 22, question: "Study the pattern: First row - 67, 25, 101; extend to fourth row - 30, 22, ?", options: ["A) 50", "B) 54", "C) 64", "D) 74"], correct: 1 },
    { id: 23, question: "X says to Y: \"You are the brother of the daughter of my mother's only son.\" How is Y related to X?", options: ["A) Brother", "B) Cousin", "C) Self", "D) Uncle"], correct: 0 },
    { id: 24, question: "Hendecagon : 11 sides :: ? : 8 sides (Advanced polygon analogy.)", options: ["A) Octagon", "B) Heptagon", "C) Hexagon", "D) Nonagon"], correct: 0 },
    { id: 25, question: "In the figure with 24 triangles, how many smallest triangles are there?", options: ["A) 4", "B) 10", "C) 16", "D) 20"], correct: 0 }
  ],
  'logical-reasoning': [
    // From previous tool, 15 basic
    { id: 1, question: "Look at this series: 12, 11, 13, 12, 14, 13, … What number should come next?", options: ["A. 10", "B. 16", "C. 13", "D. 15"], correct: 3 },
    { id: 2, question: "Look at this series: 36, 34, 30, 28, 24, … What number should come next?", options: ["A. 22", "B. 26", "C. 23", "D. 20"], correct: 0 },
    { id: 3, question: "Look at this series: 7, 10, 8, 11, 9, 12, … What number should come next?", options: ["A. 7", "B. 12", "C. 10", "D. 13"], correct: 2 },
    { id: 4, question: "Look at this series: 2, 1, (1/2), (1/4), … What number should come next?", options: ["A. (1/3)", "B. (1/8)", "C. (2/8)", "D. (1/16)"], correct: 1 },
    { id: 5, question: "Look at this series: 80, 10, 70, 15, 60, … What number should come next?", options: ["A. 20", "B. 25", "C. 30", "D. 50"], correct: 0 },
    { id: 6, question: "Which word does NOT belong with the others?", options: ["A. index", "B. glossary", "C. chapter", "D. book"], correct: 3 },
    { id: 7, question: "Which word is the odd man out?", options: ["A. trivial", "B. unimportant", "C. important", "D. insignificant"], correct: 2 },
    { id: 8, question: "Which word does NOT belong with the others?", options: ["A. wing", "B. fin", "C. beak", "D. rudder"], correct: 2 },
    { id: 9, question: "Which word is the odd man out?", options: ["A. hate", "B. fondness", "C. liking", "D. attachment"], correct: 0 },
    { id: 10, question: "Pick the odd man out?", options: ["A. just", "B. fair", "C. equitable", "D. biased"], correct: 3 },
    { id: 11, question: "CUP : LIP :: BIRD :", options: ["A. GRASS", "B. FOREST", "C. BEAK", "D. BUSH"], correct: 2 },
    { id: 12, question: "Paw : Cat :: Hoof :", options: ["A. Lamb", "B. Horse", "C. Elephant", "D. Tiger"], correct: 1 },
    { id: 13, question: "Safe : Secure :: Protect :", options: ["A. Lock", "B. Guard", "C. Sure", "D. Conserve"], correct: 1 },
    { id: 14, question: "Melt : Liquid :: Freeze :", options: ["A. Ice", "B. Solid", "C. Condense", "D. Push"], correct: 1 },
    { id: 15, question: "Parts : Strap :: Wolf :", options: ["A. Flow", "B. Animal", "C. Wood", "D. Fox"], correct: 0 },
    // Puzzles (16-25) from tool
    { id: 16, question: "An Informal Gathering occurs when a group of people get together in a casual, relaxed manner. Which situation below is the best example of an Informal Gathering?", options: ["A. A debating club meets on the first Sunday morning of every month.", "B. After finding out about his salary raise, Jay and a few colleagues go out for a quick dinner after work.", "C. Meena sends out 10 invitations for a bachelorette party she is giving for her elder sister.", "D. Whenever she eats at a Chinese restaurant, Roop seems to run into Dibya."], correct: 1 },
    { id: 17, question: "A Tiebreaker is an additional contest carried out to establish a winner among tied contestants. Choose one situation from the options below that best represents a Tiebreaker.", options: ["A. At halftime, the score is tied at 2-2 in a football match.", "B. Serena and Maria have each secured 1 set in the game.", "C. The umpire tosses a coin to decide which team will have bat first.", "D. RCB and KKR each finished at 140 all out."], correct: 3 },
    { id: 18, question: "The Sharks and the Bears each finished with 34 points, and they are now battling it out in a five-minute overtime.", options: ["A. When he is offered a better paying position, Jacob leaves the restaurant he manages to manage a new restaurant on the other side of town.", "B. Catherine is spending her junior year of college studying abroad in France.", "C. Malcolm is readjusting to civilian life after two years of overseas military service.", "D. After several miserable months, Sharon decides that she can no longer share an apartment with her roommate Hilary."], correct: 2 },
    { id: 19, question: "Reentry occurs when a person leaves his or her social system for a period of time and then returns. Which situation below best describes Reentry?", options: ["A. When he is offered a better paying position, Javed leaves the hotel he manages to manage another one in a neighboring city.", "B. Charan is spending her final year of college studying abroad in China.", "C. Manan is readjusting to civilian life after 2 years of overseas merchant navy service.", "D. After 5 miserable months, Sneha decides that she can no longer share her room with roommate Hital."], correct: 2 },
    { id: 20, question: "Posthumous Award occurs when an award is given to someone, after their death. Choose one situation below as the best example of Posthumous Award.", options: ["A. Late yesteryear actress Sridevi was awarded with a Lifetime Achievement Award posthumously in Filmfare 2019.", "B. Chitra never thought she’d live to receive a third booker prize for her novel.", "C. Emanuel has been honored with a prestigious literary award for his writing career and his daughter accepted the award on behalf of her deceased father.", "D. Meenal’s publisher canceled her book contract after she failed to deliver the manuscript on time."], correct: 0 },
    { id: 21, question: "The ‘A’ state government has chalked out a plan for the underdeveloped ‘B’ district, where 66% of the funds will be placed in the hands of a committee of local representatives. Courses of action: I. The ‘A’ state government should decide guidelines and norms for the functioning of the committee. II. Other state government may follow similar plan if directed by the Central government.", options: ["A) If only I follows", "B) If only II follows", "C) If either I or II follows", "D) If neither I nor II follows", "E) If both I and II follow"], correct: 0 },
    { id: 22, question: "The car dealer found a tremendous response for the new XYZ’s car booking, with long queues of people complaining about the duration of business hours and arrangements. Courses of action: I. People should make their arrangement of lunch and snacks while going for car XYZ’s booking and be ready to spend several hours. II. Arrangement should be made for more booking desks and increase business hours to serve more people in less time.", options: ["A) If only I follows", "B) If only II follows", "C) If either I or II follows", "D) If neither I nor II follows", "E) If both I and II follow"], correct: 1 },
    { id: 23, question: "The ‘M’ state government has decided hence forth to award the road construction contracts through open tenders only. Courses of action: I. The ‘M’ state will not be able to get the work done swiftly as it will have to go through tender and other procedures. II. Hence forth the quality of roads constructed may be far better.", options: ["A) If only I follows", "B) If only II follows", "C) If either I or II follows", "D) If neither I nor II follows", "E) If both I and II follow"], correct: 3 },
    { id: 24, question: "Alert villagers nabbed a group of bandits armed with murderous weapons. Courses of action: I. The villagers should be provided sophisticated weapons. II. The villagers should be rewarded for their courage and unity.", options: ["A) If only I follows", "B) If only II follows", "C) If either I or II follows", "D) If neither I nor II follows", "E) If both I and II follow"], correct: 1 },
    { id: 25, question: "10 passenger train coaches have been derailed and blocked the railway track from both ends. Courses of action: I. The railway authorities should immediately send men and equipment and clear the spot II. All the trains running in both directions should be diverted immediately via other routes.", options: ["A) If only I follows", "B) If only II follows", "C) If either I or II follows", "D) If neither I nor II follows", "E) If both I and II follow"], correct: 4 }
  ],
  'abstract-reasoning': [
    // Adapted text-based from tool and search (patterns without diagrams)
    { id: 1, question: "Which figure completes the sequence? Pattern: A sequence of shapes where each figure progresses by rotating clockwise and adding one line segment: Figure 1 is a square with no lines; Figure 2 is a square rotated 90 degrees with one diagonal line; Figure 3 is a square rotated 180 degrees with two crossing lines.", options: ["A. Square rotated 270 degrees with three parallel lines.", "B. Square rotated 270 degrees with two crossing lines and one additional segment.", "C. Circle with no lines.", "D. Triangle rotated 90 degrees with one line."], correct: 1 },
    { id: 2, question: "Which figure completes the statement? Pattern: Left side shows a triangle above a circle; right side shows a circle below a square. The missing figure completes the analogy by mirroring the positional relationship (shape inversion).", options: ["A. Square above a triangle.", "B. Triangle below a circle.", "C. Circle above a square.", "D. Square below a triangle."], correct: 0 },
    { id: 3, question: "Which figure is the odd one out? Pattern: Four figures: Three are shaded circles with increasing dots (1, 2, 3 dots); one is an unshaded square with 2 dots.", options: ["A. Shaded circle with 1 dot.", "B. Shaded circle with 2 dots.", "C. Unshaded square with 2 dots.", "D. Shaded circle with 3 dots."], correct: 2 },
    { id: 4, question: "Identify the missing square. Pattern: A 3x3 grid where rows follow a pattern of increasing size: Row 1 has small, medium, large circles; Row 2 has small, medium, large squares; Row 3 has small circles, missing medium, large triangles.", options: ["A. Small circle.", "B. Medium triangle.", "C. Large square.", "D. Medium circle."], correct: 1 },
    { id: 5, question: "Which figure completes the grid? Pattern: A 2x2 grid: Top-left is a black square; top-right is a white circle; bottom-left is a white square. The bottom-right should complete the pattern by alternating colors and changing shape to circle.", options: ["A. Black circle.", "B. White square.", "C. Black square.", "D. White circle."], correct: 0 },
    // Additional text-based patterns (6-25) - Generated based on common abstract types
    { id: 6, question: "Complete the series: Odd numbers: 1, 3, 5, 7, ... Next?", options: ["A) 8", "B) 9", "C) 10", "D) 11"], correct: 1 },
    { id: 7, question: "Odd one out: Apple, Banana, Carrot, Orange.", options: ["A) Apple", "B) Banana", "C) Carrot", "D) Orange"], correct: 2 },
    { id: 8, question: "Analogy: Bird : Fly :: Fish :", options: ["A) Swim", "B) Walk", "C) Run", "D) Jump"], correct: 0 },
    { id: 9, question: "Pattern: A B C D, E F G H, I J K ?", options: ["A) L", "B) M", "C) N", "D) O"], correct: 0 },
    { id: 10, question: "Missing term: 2 4 8 16 ?", options: ["A) 20", "B) 24", "C) 32", "D) 64"], correct: 3 },
    { id: 11, question: "Odd one: Chair, Table, Sofa, Car.", options: ["A) Chair", "B) Table", "C) Sofa", "D) Car"], correct: 3 },
    { id: 12, question: "Analogy: Hot : Cold :: Day :", options: ["A) Night", "B) Morning", "C) Evening", "D) Afternoon"], correct: 0 },
    { id: 13, question: "Series: 1 4 9 16 ?", options: ["A) 20", "B) 25", "C) 36", "D) 49"], correct: 1 },
    { id: 14, question: "Pattern: Red Green Blue, Yellow Orange ?", options: ["A) Purple", "B) Indigo", "C) Violet", "D) Black"], correct: 1 },
    { id: 15, question: "Odd one: Dog, Cat, Lion, Eagle.", options: ["A) Dog", "B) Cat", "C) Lion", "D) Eagle"], correct: 3 },
    { id: 16, question: "Complete: Doctor : Hospital :: Teacher :", options: ["A) School", "B) Office", "C) Shop", "D) Factory"], correct: 0 },
    { id: 17, question: "Series: 3 6 9 12 ?", options: ["A) 13", "B) 14", "C) 15", "D) 16"], correct: 2 },
    { id: 18, question: "Analogy: Pen : Write :: Knife :", options: ["A) Cut", "B) Eat", "C) Drink", "D) Read"], correct: 0 },
    { id: 19, question: "Pattern: 1 8 27 64 ?", options: ["A) 100", "B) 125", "C) 216", "D) 343"], correct: 1 },
    { id: 20, question: "Odd one: Summer, Winter, Spring, Monday.", options: ["A) Summer", "B) Winter", "C) Spring", "D) Monday"], correct: 3 },
    { id: 21, question: "Complete: Book : Read :: Food :", options: ["A) Eat", "B) Cook", "C) Buy", "D) Sell"], correct: 0 },
    { id: 22, question: "Series: 5 10 15 20 ?", options: ["A) 21", "B) 22", "C) 25", "D) 30"], correct: 2 },
    { id: 23, question: "Analogy: Tree : Forest :: Star :", options: ["A) Galaxy", "B) Sky", "C) Night", "D) Sun"], correct: 0 },
    { id: 24, question: "Pattern: A C E G ?", options: ["A) H", "B) I", "C) J", "D) K"], correct: 1 },
    { id: 25, question: "Odd one: Paris, London, Berlin, Pacific.", options: ["A) Paris", "B) London", "C) Berlin", "D) Pacific"], correct: 3 }
  ],
  'programming-fundamentals': [
    // Basic (1-15) from tool
    { id: 1, question: "What is the correct syntax to declare an integer variable in C?", options: ["a) int a;", "b) integer a;", "c) var a = 1;", "d) int a = \"hello\";"], correct: 0 },
    { id: 2, question: "Which header file is required for using the printf function?", options: ["a) #include <math.h>", "b) #include <stdio.h>", "c) #include <string.h>", "d) #include <stdbool.h>"], correct: 1 },
    { id: 3, question: "What is the syntax for a basic if-else statement to check if a > b?", options: ["a) if (a > b) printf(\"a is greater\"); else printf(\"b is greater\");", "b) if a > b then print \"a is greater\" else print \"b is greater\";", "c) if(a > b { printf(\"a is greater\"); } else { printf(\"b is greater\"); }", "d) condition (a > b) { printf(\"a is greater\"); } else { printf(\"b is greater\"); }"], correct: 0 },
    { id: 4, question: "How do you declare a function that returns an integer and takes no parameters?", options: ["a) int function() { return 0; }", "b) function int() { return 0; }", "c) return int function();", "d) int function { return 0; }"], correct: 0 },
    { id: 5, question: "What is the correct way to include the math.h header for using pow function?", options: ["a) import <math.h>", "b) #include math.h", "c) #include <math.h>", "d) require <math.h>"], correct: 2 },
    { id: 6, question: "Which syntax is used for a for loop to iterate from 1 to n?", options: ["a) for (int i = 1; i <= n; i++) { ... }", "b) loop i = 1 to n { ... }", "c) for i in 1..n { ... }", "d) while i <= n { i++; ... }"], correct: 0 },
    { id: 7, question: "What is the syntax to define a constant using #define?", options: ["a) #define PI 3.142", "b) const PI = 3.142;", "c) define PI = 3.142", "d) #const PI 3.142"], correct: 0 },
    { id: 8, question: "How do you declare a character array (string) in C?", options: ["a) char s[] = \"GeeksforGeeks\";", "b) string s = \"GeeksforGeeks\";", "c) char* s = GeeksforGeeks;", "d) array s = \"GeeksforGeeks\";"], correct: 0 },
    { id: 9, question: "What is the correct syntax for a while loop in C?", options: ["a) while (condition) { ... }", "b) while condition { ... }", "c) do { ... } while condition;", "d) loop while (condition) { ... }"], correct: 0 },
    { id: 10, question: "Which is the correct way to use the return statement in main?", options: ["a) return 0;", "b) exit(0);", "c) end;", "d) return;"], correct: 0 },
    { id: 11, question: "What syntax is used to declare a structure in C?", options: ["a) struct Student { char* name; int roll_number; };", "b) structure Student { name: char; roll_number: int; };", "c) class Student { char name; int roll_number; };", "d) struct Student: char name, int roll_number;"], correct: 0 },
    { id: 12, question: "How do you access a structure member?", options: ["a) student.name", "b) student->name", "c) student[name]", "d) get student.name"], correct: 0 },
    { id: 13, question: "What is the syntax for a switch statement?", options: ["a) switch (var) { case 1: ... break; default: ... }", "b) if (var == 1) { ... } else if ...", "c) select var { 1: ... default: ... }", "d) switch var: case 1 ..."], correct: 0 },
    { id: 14, question: "Which syntax declares a pointer to an integer?", options: ["a) int *ptr;", "b) pointer ptr to int;", "c) int& ptr;", "d) *int ptr;"], correct: 0 },
    { id: 15, question: "What is the correct syntax for the main function?", options: ["a) int main() { ... return 0; }", "b) void main { ... }", "c) main() { ... end; }", "d) function main int { ... }"], correct: 0 },
    // Real-time (16-25) from tool
    { id: 16, question: "Predict the output: #include <stdio.h> int main() { int a = 1, b = 2, c = 3; if (a > b && a > c) printf(\"%d\", a); else if (b > a && b > c) printf(\"%d\", b); else printf(\"%d\", c); return 0; }", options: ["A) 1", "B) 2", "C) 3", "D) Error"], correct: 2, isCode: true },
    { id: 17, question: "Predict the output: #include <stdio.h> int main() { int n = 91; int cnt = 0; for (int i = 1; i <= n; i++) { if (n % i == 0) cnt++; } if (cnt > 2) printf(\"%d is NOT prime\", n); return 0; }", options: ["A) 91 is prime", "B) 91 is NOT prime", "C) Error", "D) 0"], correct: 1, isCode: true },
    { id: 18, question: "Predict the output: #include <stdio.h> #include <math.h> int main() { double principal = 2300; double rate = 7; double time = 4; double amount = principal * pow((1 + rate / 100), time); double CI = amount - principal; printf(\"Compound Interest is : %lf\", CI); return 0; }", options: ["A) 714.83", "B) 2300", "C) 7", "D) 4"], correct: 0, isCode: true },
    { id: 19, question: "Predict the output: #include <stdio.h> int main() { int x = 10; int y = 20; printf(\"x: %d , y: %d\\n\", x, y); x = x + y; y = x - y; x = x - y; printf(\"x: %d , y: %d\\n\", x, y); return 0; }", options: ["A) x: 10 , y: 20 x: 20 , y: 10", "B) x: 20 , y: 10 x: 10 , y: 20", "C) Error", "D) x: 30 , y: 30"], correct: 0, isCode: true },
    { id: 20, question: "Predict the output: #include <stdio.h> #include <math.h> int main() { int N = 102301; int ans = 0; int i = 0; while (N != 0) { if (N % 10 == 0) ans = ans + 1 * pow(10, i); else ans = ans + (N % 10) * pow(10, i); N = N / 10; i++; } printf(\"%d\", ans); return 0; }", options: ["A) 102301", "B) 112311", "C) Error", "D) 0"], correct: 1, isCode: true },
    { id: 21, question: "Predict the output: #include <stdio.h> int main() { int N = 11011; int a = 1; int ans = 0; while (N != 0) { ans = ans + (N % 10) * a; N = N / 10; a = a * 2; } printf(\"%d\", ans); return 0; }", options: ["A) 27", "B) 11011", "C) Error", "D) 0"], correct: 0, isCode: true },
    { id: 22, question: "Predict the output for leap year function with 2000, 2002, 2008.", options: ["A) All leap", "B) 2000 leap, 2002 not, 2008 leap", "C) None leap", "D) Error"], correct: 1, isCode: true },
    { id: 23, question: "Predict output for swap using XOR: x=5, y=3.", options: ["A) x=3 y=5", "B) x=5 y=3", "C) Error", "D) x=0 y=0"], correct: 0, isCode: true },
    { id: 24, question: "Predict factorial of 5 using recursion.", options: ["A) 120", "B) 5", "C) Error", "D) 1"], correct: 0, isCode: true },
    { id: 25, question: "Predict output for Fibonacci 6.", options: ["A) 8", "B) 5", "C) 13", "D) 1"], correct: 0, isCode: true }
  ]
};

const categories = ['aptitude', 'vocabulary', 'numerical-reasoning', 'verbal-reasoning', 'logical-reasoning', 'abstract-reasoning', 'programming-fundamentals'];

function Assessments() {
  const [currentCategory, setCurrentCategory] = useState('aptitude');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const questions = questionsData[currentCategory] || [];

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

  const isComplete = questions.length > 0 && questions.every(q => selectedAnswers[q.id] !== undefined);

  if (submitted) {
    return (
      <Container>
        <Header>
          <h1>{currentCategory.replace(/-/g, ' ').toUpperCase()} Quiz Complete!</h1>
        </Header>
        <ScoreContainer>
          <ScoreText>Your Score: {score} / {questions.length}</ScoreText>
          <p>{score === questions.length ? 'Perfect score!' : score >= questions.length / 2 ? 'Good job!' : 'Review and retry!'}</p>
          <SubmitButton onClick={() => { setSubmitted(false); setSelectedAnswers({}); setScore(null); }}>Retake</SubmitButton>
          <SubmitButton onClick={() => setCurrentCategory('aptitude')} style={{ marginTop: '1rem' }}>Change Category</SubmitButton>
        </ScoreContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h1>Assessments - Interview Exam</h1>
        <p>Select a category below to start the 25-question MCQ quiz (12-13 basic, 12-13 real-time problems).</p>
      </Header>
      <CategoryTabs>
        {categories.map(cat => (
          <TabButton key={cat} active={currentCategory === cat} onClick={() => setCurrentCategory(cat)}>
            {cat.replace(/-/g, ' ').toUpperCase()}
          </TabButton>
        ))}
      </CategoryTabs>
      <Instructions>
        Answer the {questions.length} questions in {currentCategory.replace(/-/g, ' ').toUpperCase()}. This simulates a real job interview aptitude test. Good luck!
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
        {isComplete ? 'Submit Quiz' : `Answer all ${questions.length} questions (${Object.keys(selectedAnswers).length}/${questions.length})`}
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