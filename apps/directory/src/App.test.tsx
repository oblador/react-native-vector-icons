import { act, fireEvent, render, screen, within } from '@testing-library/react';

import App from './App';

jest.mock('./generated/glyphmapIndex.json', () => ({
  FontAwesome: { search: 0xf002 },
}));

test('renders directory link', () => {
  render(<App />);
  const linkElement = screen.getByText(/react-native-vector-icons directory/i);
  expect(linkElement).toBeInTheDocument();
});

test('copies an icon name and resets accessible feedback', async () => {
  jest.useFakeTimers();
  const writeText = jest.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText },
  });

  render(<App />);
  const iconCard = screen.getAllByRole('button', {
    name: 'Copy search icon name',
  })[0];

  await act(async () => {
    fireEvent.click(iconCard);
    await Promise.resolve();
  });

  expect(writeText).toHaveBeenCalledWith('search');
  expect(within(iconCard).getByRole('status')).toHaveTextContent('Copied!');

  act(() => jest.advanceTimersByTime(1800));

  expect(within(iconCard).queryByRole('status')).not.toBeInTheDocument();
  jest.useRealTimers();
});
