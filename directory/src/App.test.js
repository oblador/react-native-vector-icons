import { render } from '@testing-library/react';
import App from './App';

test('renders learn directory header', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/react-native-vector-icons directory/i);
  expect(headerElement).toBeInTheDocument();
});
