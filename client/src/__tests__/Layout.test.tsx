import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../components/Layout';

const renderWithPath = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Layout>
        <div>content</div>
      </Layout>
    </MemoryRouter>
  );

test('hides sidebar on public routes', () => {
  renderWithPath('/login');
  expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
});

test('shows sidebar on authenticated routes', () => {
  renderWithPath('/dashboard');
  expect(screen.getByRole('complementary')).toBeInTheDocument();
});
