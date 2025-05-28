import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';

const renderWithPath = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<div>content</div>} />
        </Route>
      </Routes>
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
