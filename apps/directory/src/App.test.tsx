import { render, screen } from '@testing-library/react';

import App from './App';

test('renders directory link', () => {
  render(<App />);
  const linkElement = screen.getByText(/react-native-vector-icons directory/i);
  expect(linkElement).toBeInTheDocument();
});
