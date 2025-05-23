import { render, screen } from '@testing-library/react';
import { RootComponent } from '../../../client/src/index';

describe('RootComponent', () => {
  it('renders login page by default', () => {
    render(<RootComponent />);
    expect(screen.getByText(/login/i)).toBeTruthy();
  });
});
