import React from 'react';
import AuthenticationLayout from '../layouts/AuthenticationLayout';

const RegisterPage: React.FC = () => {
  return (
    <AuthenticationLayout title="Register" link={{ text: 'Login', to: '/login' }}>
      <div>Register Form</div>
    </AuthenticationLayout>
  );
};

export default RegisterPage;
