import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Router from '../../../client/src/routes';
import { Provider } from '../../../client/src/components/ui/provider';
import { store } from '../../../client/src/store';
import { login, logout } from '../../../client/src/store/authSlice';

describe('Router role based routing', () => {
  beforeEach(() => {
    store.dispatch(logout());
    window.localStorage.clear();
  });

  it('renders landing page when no token on root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider>
          <Router />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome to Voltaic CRM/i)).toBeInTheDocument();
  });

  it('redirects to login when visiting protected route without token', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Provider>
          <Router />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome Back!/i)).toBeInTheDocument();
  });

  it('shows dashboard content when admin user exists', () => {
    store.dispatch(
      login.fulfilled(
        { user: { name: 'Admin', email: 'a@test.com', role: 'Admin' }, token: 't' },
        '',
        { email: '', password: '' }
      )
    );
    render(
      <MemoryRouter initialEntries={['/dashboard/projects']}>
        <Provider>
          <Router />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
  });
});
