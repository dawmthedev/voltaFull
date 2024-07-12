import React, { useState } from 'react';

const Exam = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    { question: 'What is 2 + 2?', options: ['3', '4', '5'], correct: '4' },
    { question: 'What is the capital of France?', options: ['London', 'Berlin', 'Paris'], correct: 'Paris' },
    { question: 'What is the chemical symbol for water?', options: ['H2O', 'CO2', 'NaCl'], correct: 'H2O' }
  ];

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correct) correctAnswers += 1;
    });
    setScore(correctAnswers);
    setSubmitted(true);
  };

  const styles = {
    container: {
      fontFamily: '"Arial", sans-serif',
      maxWidth: '600px',
      margin: 'auto',
      color: 'black',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      background: '#f9f9f9',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    input: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      background: '#007BFF',
      color: 'white',
      cursor: 'pointer',
    },
    label: {
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    successMessage: {
      textAlign: 'center',
      color: 'green',
      fontWeight: 'bold',
    },
    question: {
      marginBottom: '20px',
    },
    questionTitle: {
      fontWeight: 'bold',
    },
  };

  if (submitted) {
    return (
      <div style={styles.container}>
        {score >= 2 ? (
          <div style={styles.successMessage}>Congratulations! You passed the exam.</div>
        ) : (
          <div style={styles.successMessage}>Sorry, you did not pass. Try again!</div>
        )}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Exam</h1>
      {questions.map((q, index) => (
        <div key={index} style={styles.question}>
          <p style={styles.questionTitle}>{q.question}</p>
          {q.options.map((option, i) => (
            <label key={i}>
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                onChange={() => handleChange(index, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} style={styles.button}>Submit</button>
    </div>
  );
};

export default Exam;
