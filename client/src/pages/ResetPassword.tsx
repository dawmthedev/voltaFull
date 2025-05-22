import React from 'react';
import AuthenticationLayout from '../layouts/AuthenticationLayout';

const ResetPasswordPage: React.FC = () => {
  return (
    <AuthenticationLayout title="Reset Password" link={{ text: 'Login', to: '/login' }}>
      <div>Reset Password</div>
    </AuthenticationLayout>
  );
};

export default ResetPasswordPage;
