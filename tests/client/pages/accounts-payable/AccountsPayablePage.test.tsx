import { render, screen } from '@testing-library/react';
import { Provider } from '../../../../client/src/components/ui/provider';
import AccountsPayablePage from '../../../../client/src/pages/AccountsPayablePage';
import '@testing-library/jest-dom';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          data: [
            {
              _id: '1',
              technicianId: { name: 'Tech' },
              projectId: { homeowner: 'Home' },
              percentage: 50,
              amountDue: 100,
              paid: false,
            },
          ],
        }),
    })
  ) as any;
});

afterEach(() => {
  (global.fetch as jest.Mock).mockRestore();
});

describe('AccountsPayablePage', () => {
  it('renders fetched rows', async () => {
    render(
      <Provider>
        <AccountsPayablePage />
      </Provider>
    );

    expect(await screen.findByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Upcoming')).toBeInTheDocument();
    expect((global.fetch as jest.Mock).mock.calls[0][0]).toContain('/rest/payroll');
  });
});
