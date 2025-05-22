import React, { useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../hooks/hooks';
import { authSelector } from '../redux/slice/authSlice';

function UtilitySign() {
  const UserData = useAppSelector(authSelector)?.data;
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission status

  const submitNewUtilityAFD = async (e) => {
    e.preventDefault();
    const QB_DOMAIN = process.env.REACT_APP_QB_DOMAIN;
    const API_ENDPOINT = "https://api.quickbase.com/v1/records";
    
    const headers = {
      Authorization: process.env.REACT_APP_QB_USER_TOKEN,
      "QB-Realm-Hostname": QB_DOMAIN,
      "Content-Type": "application/json",
    };
  
    const requestBody = {
      to: "btc8mr5x9", // Table identifier in Quickbase
      data: [{
         7: { value: email },
         62: { value: UserData?.id },
      }],
      fieldsToReturn: [] // Specify fields to return, if any
    };
  
    try {
      const response = await axios.post(API_ENDPOINT, requestBody, { headers });
      console.log("Success!", response.data);
      setIsSubmitted(true); // Set the submission status to true upon success
    } catch (error) {
      console.error("Failed to send data:", error);
    }
  };

  // Inline styles
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
    }
  };

  return (
    <div style={styles.container}>
      <h3>Utility Affidavit Signature Prep</h3>
      {isSubmitted ? (
        <div style={styles.successMessage}>
          Your proposal has been successfully generated!
        </div>
      ) : (
        <form onSubmit={submitNewUtilityAFD} style={styles.form}>
          <label htmlFor="email" style={styles.label}>Homeowner's Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            style={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" style={styles.button}>Generate Proposal</button>
        </form>
      )}
    </div>
  );
}

export default UtilitySign;
