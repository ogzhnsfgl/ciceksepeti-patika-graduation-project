import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from 'components/Button/Button';

const mockFn = jest.fn();

beforeEach(() => {
  render(
    <>
      <Button text="Test button" className="btn" clickEvent={() => mockFn()} />
    </>
  );
});

test('Button component should has button with correct text context initially  ', () => {
  screen.getByRole('button', { name: /test button/i });
});

test('Button component should has button with correct classname initially  ', () => {
  const btn = screen.getByRole('button', { name: /test button/i });

  expect(btn).toHaveClass('btn');
});

test('Clickevent should be work after click the button', () => {
  const btn = screen.getByRole('button', { name: /test button/i });

  userEvent.click(btn);
  expect(mockFn).toHaveBeenCalled();
});
