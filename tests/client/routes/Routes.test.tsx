import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Router from '../../../client/src/routes';

describe('Router token based routing', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders landing page when no token on root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}> 
        <Router />
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome to Voltaic CRM/i)).toBeInTheDocument();
  });

  it('redirects to login when visiting protected route without token', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}> 
        <Router />
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome Back!/i)).toBeInTheDocument();
  });

  it('shows dashboard content when token exists', () => {
    window.localStorage.setItem('token', 'abc');
    render(
      <MemoryRouter initialEntries={['/dashboard']}> 
        <Router />
      </MemoryRouter>
    );
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
  });
});
