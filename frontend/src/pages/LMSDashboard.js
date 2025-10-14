import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const H2 = styled.h2`
  color: #333;
  border-bottom: 2px solid #ff6b6b;
  padding-bottom: 0.5rem;
`;

const ResourceCard = styled.div`
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
`;

const ResourceTitle = styled.h3`
  color: #ff6b6b;
  margin-bottom: 0.5rem;
`;

const ResourceDesc = styled.p`
  color: #666;
  margin-bottom: 0.5rem;
`;

const ResourceLink = styled.a`
  color: #007bff;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const resources = {
  aptitude: [
    { title: 'Aptitude Basics', description: 'Intro to quantitative aptitude.', url: 'https://www.khanacademy.org/math' },
    { title: 'Practice Problems', description: 'Free aptitude exercises.', url: 'https://www.geeksforgeeks.org/aptitude-questions-and-answers/' },
  ],
  'soft-skills': [
    { title: 'Communication Skills', description: 'Tips for better interviews.', url: 'https://www.youtube.com/watch?v=example-comms' }, // Replace with real link
    { title: 'Teamwork Guide', description: 'Building soft skills.', url: 'https://www.coursera.org/learn/soft-skills' },
  ],
  'programming-fundamentals': [
    { title: 'JS Basics', description: 'JavaScript for beginners.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { title: 'Data Structures', description: 'Intro to arrays and objects.', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/' },
  ],
  // Add more categories like numerical-reasoning, etc., as needed
};

function LMSDashboard() {
  return (
    <Container>
      <h1>Learning Management System (LMS)</h1>
      <p>Explore resources to prepare for assessments. Categories: Aptitude, Soft Skills, Programming Fundamentals, and more.</p>
      
      {Object.entries(resources).map(([category, items]) => (
        <Section key={category}>
          <H2>{category.replace('-', ' ').toUpperCase()}</H2>
          {items.map((resource, idx) => (
            <ResourceCard key={idx}>
              <ResourceTitle>{resource.title}</ResourceTitle>
              <ResourceDesc>{resource.description}</ResourceDesc>
              <ResourceLink href={resource.url} target="_blank" rel="noopener noreferrer">
                Open Resource →
              </ResourceLink>
            </ResourceCard>
          ))}
        </Section>
      ))}
    </Container>
  );
}

export default LMSDashboard;