import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Grid,
  Card,
  Typography,
  FormControlLabel,
  FormHelperText
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationLayout from '../layouts/AuthenticationLayout';
import Iconify from '../components/iconify';
import { RegisterOrgTypes } from '../types';
import { baseURL } from '../libs/client/apiClient';
import logger from '../utils/logger';

const initialState = {
  email: '',
  name: '',
  company: '',
  password: '',
  confirmPassword: '',
  agree: false,
  verifyCode: ''
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<RegisterOrgTypes>({
    defaultValues: initialState
  });

  const handleClick = async () => {
    try {
      const response = await axios.post(`${baseURL}/auth/start-verification`, {
        email: getValues('email'),
        type: 'email'
      });

      if (response.status === 200) {
        setIsCodeSent(true);
      }
    } catch (error) {
      logger.error(error);
    }
  };
  const handleRegister = async (data: RegisterOrgTypes) => {
    try {
      const response = await axios.post(`${baseURL}/auth/register`, {
        email: data.email,
        name: data.name,
        company: data.company,
        password: data.password,
        verificationToken: data.verifyCode
      });
      logger.success(response);

      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      logger.error(error);
    }
  };
  return (
    <AuthenticationLayout title="Register" link={{ text: 'Login', to: '/login' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <form onSubmit={isCodeSent ? handleSubmit(handleRegister) : handleSubmit(handleClick)}>
              <Stack spacing={3}>
        <Controller
          name="email"
          control={control}
          rules={{ required: 'Email is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={isCodeSent}
              label="Email address"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={isCodeSent}
              label="Name"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="company"
          control={control}
          rules={{ required: 'Company is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={isCodeSent}
              label="Company"
              error={Boolean(errors.company)}
              helperText={errors.company?.message}
            />
          )}
        />
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2} sx={{ my: 2 }}>
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                disabled={isCodeSent}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            rules={{ required: 'Confirm password is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                disabled={isCodeSent}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword?.message}
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
              {isCodeSent && (
        <Stack spacing={3} sx={{ position: 'relative', mt: 2 }}>
          <Controller
            name="verifyCode"
            control={control}
            rules={{ required: 'Verification code is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Code"
                error={Boolean(errors.verifyCode)}
                helperText={errors.verifyCode?.message}
              />
            )}
          />
          <Button variant="text" sx={{ position: 'absolute', bottom: '10px', right: '10px' }}>
            Resend
          </Button>
        </Stack>
              )}

              <Stack direction="row" alignItems="center" justifyItems="start" sx={{ my: 2 }}>
        <Controller
          name="agree"
          control={control}
          rules={{ required: 'You must agree' }}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} disabled={isCodeSent} />}
              label={<Link to="#">I agree to the terms and conditions</Link>}
            />
          )}
        />
        {errors.agree && <FormHelperText error>{errors.agree.message}</FormHelperText>}
              </Stack>

              <LoadingButton fullWidth size="large" type="submit" variant="contained">
                {isCodeSent ? 'Complete Registration' : 'Register'}
              </LoadingButton>
            </Stack>
            </form>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6">Join Us!</Typography>
          </Card>
        </Grid>
      </Grid>
    </AuthenticationLayout>
  );
};

export default RegisterPage;
