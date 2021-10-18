import './loadingContainer.scss';

import Navbar from 'components/Navbar/Navbar';
import Spinner from 'components/Spinner/Spinner';
import React from 'react';

const LoadingContainer = () => (
  <>
    <Navbar />
    <div className="spinner-container">
      <Spinner />
    </div>
  </>
);

export default LoadingContainer;
