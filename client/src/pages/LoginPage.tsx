import React, { useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Grid,
  Card,
  Typography
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import AuthenticationLayout from '../layouts/AuthenticationLayout';
import Iconify from '../components/iconify';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { login } from '../redux/middleware/authentication';
import { setAlert } from '../redux/slice/alertSlice';
import { authSelector } from '../redux/slice/authSlice';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector(authSelector);

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleClick = async ({ email, password }: { email: string; password: string }) => {
    try {
      const response: any = await dispatch(login({ email, password }));
      if (response && response.error && response.error.message) {
        dispatch(
          setAlert({
            message: response.error.message,
            type: 'error'
          })
        );
        return;
      }
      if (response && response.payload) {
        dispatch(
          setAlert({
            message: 'Login successful',
            type: 'success'
          })
        );
      }
      navigate('/dashboard/deals', { replace: true });
    } catch (error) {
      dispatch(
        setAlert({
          message: error.response.data.message,
          type: 'error'
        })
      );
      console.log(error);
    }
  };
  return (
    <AuthenticationLayout title="Login" link={{ text: 'Register', to: '/register' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <form onSubmit={handleSubmit(handleClick)}>
              <Stack spacing={3}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: 'Email is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email address"
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: 'Password is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
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
                  )}
                />
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                <FormControlLabel value="remember" control={<Checkbox />} label="Remember me" labelPlacement="end" />
                <Link to="/verify-email">Forgot password?</Link>
              </Stack>

              <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
                Login
              </LoadingButton>
            </form>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6">Welcome Back!</Typography>
          </Card>
        </Grid>
      </Grid>
    </AuthenticationLayout>
  );
};

export default LoginPage;
