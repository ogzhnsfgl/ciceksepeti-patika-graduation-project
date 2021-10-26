import './navbar.scss';

import logo from 'assets/images/logo.svg';
import checkAuth from 'helpers/checkAuth';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Navbar = () => {
  const [isAuth, setisAuth] = useState(checkAuth());
  const history = useHistory();
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
              <Link to="/addproduct">
                <button
                  type="button"
                  className="navbar-btn btn-add-product"
                  aria-label="addProduct"
                />
              </Link>

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
