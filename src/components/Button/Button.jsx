import propTypes from 'prop-types';
import React from 'react';

const Button = ({ text, clickEvent, className }) => (
  <button type="submit" onClick={clickEvent} className={className}>
    {text}
  </button>
);

Button.propTypes = {
  text: propTypes.string.isRequired,
  clickEvent: propTypes.func,
  className: propTypes.string,
};
Button.defaultProps = {
  clickEvent: null,
  className: ' ',
};

export default Button;
