import propTypes from 'prop-types';
import React from 'react';

const Button = ({ text, clickEvent, className, isPending }) => (
  <button
    type="submit"
    onClick={clickEvent}
    className={className}
    disabled={isPending}
  >
    {text}
  </button>
);

Button.propTypes = {
  text: propTypes.string.isRequired,
  clickEvent: propTypes.func,
  className: propTypes.string,
  isPending: propTypes.bool,
};
Button.defaultProps = {
  clickEvent: null,
  className: ' ',
  isPending: false,
};

export default Button;
