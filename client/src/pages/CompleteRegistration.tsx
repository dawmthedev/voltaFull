import React from 'react';
import AuthenticationLayout from '../layouts/AuthenticationLayout';

const CompleteRegistration: React.FC = () => {
  return (
    <AuthenticationLayout title="Complete Registration" link={{ text: 'Login', to: '/login' }}>
      <div>Complete Registration</div>
    </AuthenticationLayout>
  );
};

export default CompleteRegistration;
