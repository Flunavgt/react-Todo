import { render, screen } from '@testing-library/react';
import TodoContainer from './Components/App/TodoContainer';

test('renders learn react link', () => {
  render(<TodoContainer />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
