/* eslint-disable jsx-a11y/control-has-associated-label */
import './navbar.scss';

import logo from 'assets/images/logo.svg';
import checkAuth from 'helpers/checkAuth';
import UseWindowSize from 'Hooks/UseWindowSize';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Navbar = () => {
  const [isAuth, setisAuth] = useState(checkAuth());
  const isMobile = UseWindowSize();
  const history = useHistory();
  console.log(`history`, history);
  const isAccountPage = history.location.pathname === '/account';

  useEffect(() => {
    setisAuth(checkAuth());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    history.push('/');
  };

  return (
    <header className="navbar">
      <div className="container navbar-wrapper">
        <Link to="/">
          <div className="navbar-logo">
            <img src={logo} alt="logo" />
          </div>
        </Link>
        <div className="navbar-btn-group">
          {!isAuth && (
            <Link to="/signin">
              <button type="button" className="navbar-btn btn-login">
                Giriş Yap
              </button>
            </Link>
          )}
          {isAuth && (
            <>
              {isMobile ? (
                <Link to="/addproduct">
                  <button
                    type="button"
                    className="navbar-btn btn-add-product mobile"
                  />
                </Link>
              ) : (
                <Link to="/addproduct">
                  <button type="button" className="navbar-btn btn-add-product">
                    Ürün Ekle
                  </button>
                </Link>
              )}
              {isAccountPage ? (
                <button
                  type="button"
                  className="navbar-btn btn-login"
                  onClick={handleLogout}
                >
                  Çıkış Yap
                </button>
              ) : (
                <Link to="/account">
                  <button type="button" className="navbar-btn btn-login">
                    Hesabım
                  </button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
