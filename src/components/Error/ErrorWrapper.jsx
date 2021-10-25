import './error.scss';

import Navbar from 'components/Navbar/Navbar';
import propTypes from 'prop-types';
import React from 'react';

import Error from './Error';

const ErrorWrapper = ({ errorMsg }) => (
  <>
    <Navbar />
    <Error errorMsg={errorMsg} />
  </>
);

ErrorWrapper.propTypes = {
  errorMsg: propTypes.string.isRequired,
};
export default ErrorWrapper;
