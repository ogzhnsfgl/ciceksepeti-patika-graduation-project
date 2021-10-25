import './error.scss';

import errorImg from 'assets/images/error-img.png';
import propTypes from 'prop-types';
import React from 'react';

const Error = ({ errorMsg }) => (
  <>
    <div className="container">
      <div className="error-wrapper">
        <div className="error-img">
          <img src={errorImg} alt="errorImg" />
        </div>
        <div className="error-message">
          <p>Oooops! </p>
          {errorMsg} 😞
          <a href="/">
            <div className="error-link">Anasayfaya dönmek için tıklayın...</div>
          </a>
        </div>
      </div>
    </div>
  </>
);

Error.propTypes = {
  errorMsg: propTypes.string.isRequired,
};
export default Error;
