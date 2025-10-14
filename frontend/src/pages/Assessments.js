import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CategoryItem = styled.li`
  margin: 1rem 0;
`;

const CategoryLink = styled(Link)`
  display: block;
  padding: 1rem;
  background: #f0f8ff;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  &:hover { background: #e6f3ff; }
`;

const categories = [
  'aptitude', 'vocabulary', 'numerical-reasoning', 'verbal-reasoning',
  'logical-reasoning', 'abstract-reasoning', 'programming-fundamentals'
];

function Assessments() {
  return (
    <Container>
      <h1>Assessments</h1>
      <p>Select a category to start the MCQ quiz (5 questions each).</p>
      <CategoryList>
        {categories.map(cat => (
          <CategoryItem key={cat}>
            <CategoryLink to={`/quiz/${cat.replace('-', ' ')}`}>{cat.replace('-', ' ').toUpperCase()}</CategoryLink>
          </CategoryItem>
        ))}
      </CategoryList>
    </Container>
  );
}

export default Assessments;