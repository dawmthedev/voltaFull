import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardDeals from '../pages/DashboardDeals';
import { Provider } from '../components/ui/provider';

describe('DashboardDeals', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [] })
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    (global.fetch as jest.Mock).mockRestore();
  });

  test('renders Deals Dashboard heading', () => {
    render(
      <Provider>
        <DashboardDeals />
      </Provider>
    );

    expect(screen.getByText(/Deals Dashboard/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Project/i })).toBeInTheDocument();
  });
});
