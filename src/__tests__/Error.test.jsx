import { render, screen } from '@testing-library/react';
import Error from 'components/Error/Error';

beforeEach(() => {
  render(
    <>
      <Error errorMsg="Test error message" />
    </>
  );
});

test('error message should be rendered correctly ', () => {
  screen.getByText(/test error message/i);
  screen.getByRole('link', {
    name: /anasayfaya dönmek için tıklayın.../i,
  });
});
