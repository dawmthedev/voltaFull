import React from 'react';

export interface AuthLayoutProps {
  title: string;
  link?: { text: string; to: string };
  children: React.ReactNode;
}

const AuthenticationLayout: React.FC<AuthLayoutProps> = ({ title, link, children }) => {
  return (
    <div>
      <h2>{title}</h2>
      {link && <a href={link.to}>{link.text}</a>}
      <div>{children}</div>
    </div>
  );
};

export default AuthenticationLayout;
