import './form.scss';

import Button from 'components/Button/Button';
import checkAuth from 'helpers/checkAuth';
import checkValidField from 'helpers/formValidation';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import fetchAuth from 'redux/actions/authAction';

const Form = ({ formType }) => {
  const history = useHistory();

  const initialState = {
    email: '',
    password: '',
    emailTouched: false,
    emailValid: false,
    passwordValid: false,
    passwordTouched: false,
    showEmailWarning: false,
    showPasswordWarning: false,
  };
  const [formControl, setformControl] = useState(initialState);
  const {
    email,
    password,
    emailValid,
    passwordValid,
    emailTouched,
    passwordTouched,
    showEmailWarning,
    showPasswordWarning,
  } = formControl;

  const dispatch = useDispatch();
  const btnText = formType === 'signin' ? 'Giriş Yap' : 'Üye Ol';
  const userState = useSelector((state) => state.auth);

  const handleOnChange = (e) => {
    switch (e.target.name) {
      case 'email':
        setformControl({
          ...formControl,
          email: e.target.value,
          emailValid: checkValidField('email', e.target.value),
          emailTouched: true,
        });

        break;
      case 'password':
        setformControl({
          ...formControl,
          password: e.target.value,
          passwordValid: checkValidField('password', e.target.value),
          passwordTouched: true,
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailValid && passwordValid) {
      setformControl({
        ...formControl,
        showEmailWarning: false,
        showPasswordWarning: false,
      });
      dispatch(fetchAuth({ email, password }, formType));
    } else {
      if (!emailValid && passwordValid)
        setformControl({
          ...formControl,
          showEmailWarning: true,
          showPasswordWarning: false,
        });
      if (emailValid && !passwordValid)
        setformControl({
          ...formControl,
          showPasswordWarning: true,
          showEmailWarning: false,
        });

      if (!emailValid && !passwordValid)
        setformControl({
          ...formControl,
          showEmailWarning: true,
          showPasswordWarning: true,
        });
    }
  };

  useEffect(() => {
    if (userState.error) {
      console.log('error');
    }
    if (checkAuth()) {
      history.push('/');
    }
  }, [history, userState]);

  return (
    <div className="form__wrapper">
      <div className="form__header">
        <div className="form__header-title">
          {formType === 'signin' ? 'Giriş Yap' : 'Üye Ol'}
        </div>

        <div className="form__header-description">
          Fırsatlardan yararlanmak için{' '}
          {formType === 'signin' ? 'giriş yap' : 'üye ol'}!
        </div>
      </div>
      <form onSubmit={handleSubmit} className="form__group" noValidate>
        <div className="input__group">
          <label htmlFor="email">Email</label>
          <input
            className={emailTouched && !emailValid ? 'notValid' : ''}
            type="email"
            name="email"
            id="email"
            placeholder="Email@example.com"
            value={email}
            onChange={(e) => handleOnChange(e)}
          />
          <p className={showEmailWarning ? 'warning' : 'hidden'}>
            Lütfen geçerli bir mail giriniz!
          </p>
        </div>

        <div className="input__group">
          <label htmlFor="password">Şifre </label>
          <input
            className={passwordTouched && !passwordValid ? 'notValid' : ''}
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => handleOnChange(e)}
          />
          <p className={showPasswordWarning ? 'warning' : 'hidden'}>
            Şifre 8 karakterden kısa olamaz!
          </p>
        </div>

        <Button className="form__group-btn" text={btnText} clickEvent={null} />
      </form>

      <div className="form-footer">
        {formType === 'signin' ? (
          <div>
            Hesabın yok mu? <Link to="/register">Üye Ol</Link>{' '}
          </div>
        ) : (
          <div>
            Hesabın var mı? <Link to="/login">Giriş Yap</Link>{' '}
          </div>
        )}
      </div>
    </div>
  );
};

Form.propTypes = {
  formType: PropTypes.string.isRequired,
};

export default Form;
