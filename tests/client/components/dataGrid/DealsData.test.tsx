import { render, screen, fireEvent } from '@testing-library/react';
import DealsData from '../../../../client/src/components/dataGrid/DealsData';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('DealsData component', () => {
  it('navigates to lead detail on click', async () => {
    const navigate = jest.fn();
    (require('react-router-dom') as any).useNavigate.mockReturnValue(navigate);
    render(
      <MemoryRouter>
        <DealsData recordUserId={1} />
      </MemoryRouter>
    );

    const button = await screen.findByRole('button', { name: /details/i });
    fireEvent.click(button);
    expect(navigate).toHaveBeenCalledWith('/dashboard/lead/1');
  });
});
