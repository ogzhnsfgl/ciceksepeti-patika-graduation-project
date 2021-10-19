import './form.scss';

import Button from 'components/Button/Button';
import FormInputFields from 'components/FormInputFields/FormInputFields';
import checkAuth from 'helpers/checkAuth';
import checkValidField from 'helpers/formValidation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import fetchAuth from 'redux/actions/authAction';

const initialState = {
  email: { input: '', touched: false, valid: false },
  password: { input: '', touched: false, valid: false },
  showError: false,
};

const Form = () => {
  const history = useHistory();
  const formType = history.location.pathname;
  const auth = useSelector((state) => state.auth);
  const [formControl, setformControl] = useState(initialState);
  const { email, password, showError } = formControl;
  const { input: emailInput, touched: emailTouched, valid: emailValid } = email;
  const {
    input: passwordInput,
    touched: passwordTouched,
    valid: passwordValid,
  } = password;
  const dispatch = useDispatch();
  const btnText = formType === '/signin' ? 'Giriş Yap' : 'Üye Ol';
  const userState = useSelector((state) => state.auth);

  const handleOnChange = (e) => {
    setformControl({
      ...formControl,
      [e.target.name]: {
        ...[e.target.name],
        input: e.target.value,
        valid: checkValidField(e.target.name, e.target.value),
        touched: true,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newFormControl = { ...formControl };
    if (emailValid && passwordValid) {
      newFormControl = {
        ...newFormControl,
        email: { ...email, warning: false },
        password: { ...password, warning: false },
      };
      dispatch(
        fetchAuth({ email: emailInput, password: passwordInput }, formType)
      );
    } else {
      newFormControl = { ...newFormControl, showError: true };
    }
    setformControl(newFormControl);
  };

  useEffect(() => {
    if (checkAuth()) {
      history.push('/');
    }
  }, [history, userState]);

  return (
    <div className="form__wrapper">
      <div className="form__header">
        <div className="form__header-title">
          {formType === '/signin' ? 'Giriş Yap' : 'Üye Ol'}
        </div>

        <div className="form__header-description">
          Fırsatlardan yararlanmak için{' '}
          {formType === '/signin' ? 'giriş yap' : 'üye ol'}!
        </div>
      </div>
      <form onSubmit={handleSubmit} className="form__group" noValidate>
        <FormInputFields
          name="email"
          type="email"
          label="Email"
          placeholder="Email@example.com"
          value={email.input}
          onChangeEvent={handleOnChange}
          touchState={emailTouched}
          validState={emailValid}
          showError={showError}
          errorMsg="Lütfen geçerli bir mail giriniz!"
        />
        <FormInputFields
          name="password"
          type="password"
          label="Şifre"
          value={password.input}
          onChangeEvent={handleOnChange}
          touchState={passwordTouched}
          validState={passwordValid}
          showError={showError}
          errorMsg="Şifre 8 karakterden kısa olamaz!"
        />
        <Button
          className={`form__group-btn ${auth.isPending ? 'disabled' : null}`}
          text={btnText}
          clickEvent={null}
          disabled={auth.isPending}
        />
      </form>

      <div className="form-footer">
        <div>
          {formType === '/signin' ? (
            <>
              {' '}
              Hesabın yok mu? <Link to="/signup">Üye Ol</Link>
            </>
          ) : (
            <>
              {' '}
              Hesabın var mı? <Link to="/signin">Giriş Yap</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
