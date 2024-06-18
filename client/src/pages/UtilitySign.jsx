import React, { useState } from 'react';
import axios from 'axios';

function UtilitySign() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Logging email:', email);

    try {
      const response = await axios.post('https://api.example.com/submit-email', { email });
      console.log('Email submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting email:', error);
    }
  };

  // Inline styles
  const styles = {
    container: {
      fontFamily: '"Arial", sans-serif',
      maxWidth: '600px',
      margin: 'auto',
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
    }
  };

  return (
    <div style={styles.container}>
      <h3>Utility Affidavit Signature Prep</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="email" style={styles.label}>Homeowner's Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" style={styles.button}>Request Signature</button>
      </form>
    </div>
  );
}

export default UtilitySign;
