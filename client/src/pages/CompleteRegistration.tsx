import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Checkbox, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationLayout from '../layouts/AuthenticationLayout';
import Iconify from '../components/iconify';
import { useAppDispatch } from '../hooks/hooks';
import { register } from '../redux/middleware/authentication';

const initialState = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
  agree: false
};

const CompleteRegistration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState(initialState);
  const [showPassword, setShowPassword] = useState<boolean>(false);

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

      <Stack direction="row" alignItems="center" justifyItems="start" sx={{ my: 2 }}>
        <Checkbox
          name="remember"
          checked={registerData.agree}
          onChange={(e) => setRegisterData({ ...registerData, agree: Boolean(e.target.value) })}
        />
        <Link to="#">I agree to the terms and conditions</Link>
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={() => {
          dispatch(register({ email: registerData.email, name: registerData.name, password: registerData.password }));
          navigate('/login', { replace: true });
        }}
      >
        Complete Registration
      </LoadingButton>
    </AuthenticationLayout>
  );
};

export default CompleteRegistration;
