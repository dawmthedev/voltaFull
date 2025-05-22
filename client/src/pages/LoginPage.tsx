import React, { useState } from 'react';
import AuthenticationLayout from '../layouts/AuthenticationLayout';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder
  };

  return (
    <AuthenticationLayout title="Login" link={{ text: 'Register', to: '/register' }}>
      <form onSubmit={handleSubmit}>
        <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </AuthenticationLayout>
  );
};

export default LoginPage;
