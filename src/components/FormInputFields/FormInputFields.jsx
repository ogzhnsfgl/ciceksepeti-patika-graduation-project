/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import React from 'react';

const FormInputFields = ({
  name,
  type,
  label,
  placeholder,
  value,
  onChangeEvent,
  touchState,
  validState,
  showError,
  errorMsg,
}) => (
  <div className="input__group">
    <label htmlFor="email">{label}</label>
    <input
      className={touchState && !validState ? 'notValid' : ''}
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChangeEvent(e)}
    />
    <p className={!validState && showError ? 'warning' : 'hidden'}>
      {errorMsg}
    </p>
  </div>
);

export default FormInputFields;
