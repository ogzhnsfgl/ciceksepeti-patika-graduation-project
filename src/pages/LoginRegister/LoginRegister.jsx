import './loginRegister.scss';

import banner from 'assets/images/login-image.webp';
import logo from 'assets/images/logo.svg';
import Form from 'components/Form/Form';
import React from 'react';

const LoginRegister = () => (
  <>
    <div className="login-wrapper">
      <div className="login-banner">
        <img src={banner} alt="banner" />
      </div>
      <div className="login__content">
        <div className="login__content-logo">
          <img src={logo} alt="" />
        </div>
        <Form />
      </div>
    </div>
  </>
);

export default LoginRegister;
