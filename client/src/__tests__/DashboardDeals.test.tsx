import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DashboardDeals from '../pages/DashboardDeals';
import axios from 'axios';
jest.mock('axios');
import { Provider } from '../components/ui/provider';

describe('DashboardDeals', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [] })
      })
    ) as jest.Mock;
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });
  });

  afterEach(() => {
    (global.fetch as jest.Mock).mockRestore();
    jest.resetAllMocks();
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

  test('shows upload csv button', () => {
    render(
      <Provider>
        <DashboardDeals />
      </Provider>
    );

    expect(screen.getByRole('button', { name: /Upload CSV/i })).toBeInTheDocument();
  });

  test('opens preview modal after csv upload', async () => {
    render(
      <Provider>
        <DashboardDeals />
      </Provider>
    )

    const input = screen.getByTestId('csv-input') as HTMLInputElement
    const file = new File(
      ['Homeowner,Sale Date\nJohn,2024-01-01'],
      'test.csv',
      { type: 'text/csv' }
    )
    fireEvent.change(input, { target: { files: [file] } })

    expect(await screen.findByText(/Preview CSV/i)).toBeInTheDocument()
  })
});
