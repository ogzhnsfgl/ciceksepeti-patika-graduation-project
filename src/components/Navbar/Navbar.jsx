import './navbar.scss';

import logo from 'assets/images/logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <header className="navbar">
    <div className="container navbar-wrapper">
      <div className="navbar-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="navbar-btn-group">
        <Link to="/addproduct">
          <button type="button" className="navbar-btn btn-add-product">
            Ürün Ekle
          </button>
        </Link>
        <Link to="/login">
          <button type="button" className="navbar-btn btn-login">
            Giriş Yap
          </button>
        </Link>
      </div>
    </div>
  </header>
);

export default Navbar;
