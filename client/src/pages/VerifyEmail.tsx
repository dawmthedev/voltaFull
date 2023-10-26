import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import CustomInput from '../components/input/CustomInput';
import AuthenticationLayout from '../layouts/AuthenticationLayout';

const VerifyEmail = () => {
  const [email, setEmail] = useState<string>('');

  const handleVerifyEmail = async () => {
    try {
      const response = await axios.post('http://localhost:4000/rest/auth/start-verification', {
        email: email,
        type: 'PASSWORD'
      });

      if (response?.status === 200) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthenticationLayout title="Verify Email" link={{ text: 'Login', to: '/login' }}>
      <Stack spacing={3}>
        <CustomInput value={email} onChange={(e) => setEmail(e.target.value)} name="email" label="Email" />
      </Stack>
      <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{ my: 3 }} onClick={handleVerifyEmail}>
        Send Verification Code
      </LoadingButton>
    </AuthenticationLayout>
  );
};

export default VerifyEmail;
