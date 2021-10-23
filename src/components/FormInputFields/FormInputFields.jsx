import propTypes from 'prop-types';

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

FormInputFields.propTypes = {
  name: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  errorMsg: propTypes.string.isRequired,
  onChangeEvent: propTypes.func.isRequired,
  touchState: propTypes.bool.isRequired,
  validState: propTypes.bool.isRequired,
  showError: propTypes.bool.isRequired,
};

export default FormInputFields;
