import { render, screen } from '@testing-library/react';
import { Provider } from '../../../../client/src/components/ui/provider';
import AccountsPayablePage from '../../../../client/src/pages/AccountsPayablePage';
import '@testing-library/jest-dom';

global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ data: [] }) })) as any;

describe('AccountsPayablePage', () => {
  it('renders table', async () => {
    render(
      <Provider>
        <AccountsPayablePage />
      </Provider>
    );
    expect(screen.getByRole('heading', { name: /accounts payable/i })).toBeInTheDocument();
  });
});
