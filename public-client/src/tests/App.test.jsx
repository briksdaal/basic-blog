import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import App from '../App';

it('Renders heading', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: 'Vite + React' })
  ).toBeInTheDocument();
});
