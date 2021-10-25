import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormInputFields from 'components/FormInputFields';

const mockOnChangeFn = jest.fn();

beforeEach(() => {
  render(
    <>
      <FormInputFields
        name="name"
        type="type"
        label="label"
        id="id"
        placeholder="placeholder"
        value={mockOnChangeFn()}
        onChangeEvent={(e) => mockOnChangeFn.mockReturnValue(e.target.value)}
        touchState={false}
        validState
        showError={false}
        errorMsg="Test error message"
      />
    </>
  );
});

test('component should have label and input field initially', () => {
  screen.getByText(/label/i);
  screen.getByRole('textbox', {
    id: /id/i,
  });
});

test('onChange event should change value of input', async () => {
  const inputField = await screen.findByRole('textbox', {
    id: /id/i,
  });
  await userEvent.type(inputField, 'test input');
  expect(inputField.value).toBe('test input');
});
