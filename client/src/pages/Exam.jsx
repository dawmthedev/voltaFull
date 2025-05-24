import React, { useState } from 'react';

const Exam = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [examStarted, setExamStarted] = useState(false);

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

  const startExam = () => {
    setExamStarted(true);
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
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      background: '#007BFF',
      color: 'white',
      cursor: 'pointer',
      marginRight: '10px', // Adding some space between buttons
    },
    purpleButton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      background: '#6f42c1', // Purple color
      color: 'white',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      textAlign: 'center',
      marginBottom: '10px', // Adding some space below the button
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
    welcomeMessage: {
      textAlign: 'center',
      fontSize: '1.2em',
      marginBottom: '20px',
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
        <div style={styles.successMessage}>
          {score >= 2 ? (
            <>
              Congratulations! You passed the exam.
              <br />
              <a 
                href="https://mentistechnologies.ai/course_detail/course_detail?v=1681883065111x777951302577029100"
                style={styles.purpleButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Course Details
              </a>
            </>
          ) : (
            <>
              Sorry, you did not pass. Try again!
            </>
          )}
        </div>
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div style={styles.container}>
        <div style={styles.welcomeMessage}>
          <h1>Welcome to the Exam</h1>
          <p>Before you start, you can view the course content using the button below.</p>
          <a 
            href="https://mentistechnologies.ai/course_detail/course_detail?v=1681883065111x777951302577029100"
            style={styles.purpleButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Course Content
          </a>
          <br />
          <button onClick={startExam} style={styles.button}>Start Exam</button>
        </div>
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
