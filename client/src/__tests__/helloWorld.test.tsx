import React from 'react';
import { render, screen } from '@testing-library/react';

const HelloWorld = () => <div>Hello, World!</div>;

test('renders Hello, World! text', () => {
  render(<HelloWorld />);
  const linkElement = screen.getByText(/Hello, World!/i);
  expect(linkElement).toBeInTheDocument();
});