import './loginRegister.scss';

import banner from 'assets/images/login-image.webp';
import logo from 'assets/images/logo.svg';
import Form from 'components/Form/Form';
import React from 'react';
import { Link } from 'react-router-dom';

const LoginRegister = () => (
  <>
    <div className="login-wrapper">
      <div className="login-banner">
        <img src={banner} alt="banner" />
      </div>
      <div className="login__content">
        <div className="login__content-logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <Form />
      </div>
    </div>
  </>
);

export default LoginRegister;
