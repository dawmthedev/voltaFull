import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

  test('opens add project modal', () => {
    render(
      <Provider>
        <DashboardDeals />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Add Project/i }));
    expect(screen.getByText(/Add New Project/i)).toBeInTheDocument();
  });
});
