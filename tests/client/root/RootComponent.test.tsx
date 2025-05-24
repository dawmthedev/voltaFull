import { render, screen } from '@testing-library/react';
import { RootComponent } from '../../../client/src/index';

describe('RootComponent', () => {
  it('renders hello world', () => {
    render(<RootComponent />);
    expect(screen.getByText(/hello world/i)).toBeTruthy();
  });
});
