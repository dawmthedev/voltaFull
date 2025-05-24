import React from 'react';
import { render, screen } from '@testing-library/react';
import HelloWorld from '../../client/HelloWorld';

test('renders HelloWorld component', () => {
    render(<HelloWorld />);
    const linkElement = screen.getByText(/hello world/i);
    expect(linkElement).toBeInTheDocument();
});

test('displays correct message', () => {
    render(<HelloWorld />);
    const messageElement = screen.getByText(/welcome to the application/i);
    expect(messageElement).toBeInTheDocument();
});