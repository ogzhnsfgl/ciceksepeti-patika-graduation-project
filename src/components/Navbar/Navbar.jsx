import './navbar.scss';

import logo from 'assets/images/logo.svg';
import checkAuth from 'helpers/checkAuth';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isAuth, setisAuth] = useState(checkAuth());

  useEffect(() => {
    setisAuth(checkAuth());
  }, []);

  return (
    <header className="navbar">
      <div className="container navbar-wrapper">
        <Link to="/">
          <div className="navbar-logo">
            <img src={logo} alt="logo" />
          </div>
        </Link>
        <div className="navbar-btn-group">
          <Link to="/addproduct">
            <button type="button" className="navbar-btn btn-add-product">
              Ürün Ekle
            </button>
          </Link>
          {!isAuth && (
            <Link to="/signin">
              <button type="button" className="navbar-btn btn-login">
                Giriş Yap
              </button>
            </Link>
          )}
          {isAuth && (
            <Link to="/account">
              <button type="button" className="navbar-btn btn-login">
                Hesabım
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
