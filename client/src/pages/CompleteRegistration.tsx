import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Checkbox, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationLayout from '../layouts/AuthenticationLayout';
import Iconify from '../components/iconify';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { completeVerification, register, startVerification, verifyCode } from '../redux/middleware/authentication';
import { authSelector, startVerificationAction } from '../redux/slice/authSlice';

const initialState = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
  agree: false
};

const CompleteRegistration = () => {
  const dispatch = useAppDispatch();
  const { isStartVerification, verifyCodeLoading, verifyCodeError } = useAppSelector(authSelector);
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState(initialState);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');

  const submitRegister = async () => {
    await dispatch(startVerification({ email: registerData.email, type: 'email' }));
  };

  const handleCompleteVerification = async () => {
    await dispatch(register({ email: registerData.email, name: registerData.name, password: registerData.password }));
    await dispatch(completeVerification({ email: registerData.email, code: code }));
    dispatch(startVerificationAction(false));
    navigate('/login', { replace: true });
  };

  return (
    <AuthenticationLayout title="Register" link={{ text: 'Login', to: '/login' }}>
      <Stack spacing={3}>
        <TextField
          value={registerData.email}
          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
          name="email"
          label="Email address"
        />

        <TextField
          value={registerData.name}
          onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
          name="name"
          label="Name"
        />

        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2} sx={{ my: 2 }}>
          <TextField
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
          />
          <TextField
            value={registerData.confirmPassword}
            onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
            name="confirmPassword"
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Stack>
      </Stack>

      {isStartVerification && (
        <Box>
          <Stack spacing={3} sx={{ position: 'relative', mt: 2 }}>
            <TextField
              name="code"
              label="Code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (e.target.value.length === 6) {
                  dispatch(
                    verifyCode({
                      email: registerData.email,
                      code: e.target.value
                    })
                  );
                }
              }}
            />
            <Button
              variant="text"
              sx={{ position: 'absolute', bottom: '10px', right: '10px' }}
              onClick={async () => {
                debugger;
                if (!registerData.email) alert('Please enter your email');
                dispatch(await dispatch(startVerification({ email: registerData.email, type: 'email' })));
              }}
            >
              Resend
            </Button>
          </Stack>
          {verifyCodeLoading ? 'Loading...' : ''}
          {verifyCodeError ? verifyCodeError : ''}
        </Box>
      )}

      <Stack direction="row" alignItems="center" justifyItems="start" sx={{ my: 2 }}>
        <Checkbox
          name="remember"
          checked={registerData.agree}
          onChange={(e) => setRegisterData({ ...registerData, agree: Boolean(e.target.value) })}
        />
        <Link to="#">I agree to the terms and conditions</Link>
      </Stack>
      {!isStartVerification ? (
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={submitRegister}>
          Registration
        </LoadingButton>
      ) : (
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleCompleteVerification}>
          Complete Registration
        </LoadingButton>
      )}
    </AuthenticationLayout>
  );
};

export default CompleteRegistration;
