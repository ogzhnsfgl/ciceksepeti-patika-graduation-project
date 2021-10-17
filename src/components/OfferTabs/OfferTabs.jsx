import './offerTabs.scss';

import propTypes from 'prop-types';
import React from 'react';

const OfferTabs = ({ selectedTab, setSelectedTab }) => (
  <div className="content-header">
    <button
      type="button"
      className={selectedTab === 'receivedOffers' ? 'tab selected' : 'tab'}
      onClick={() => setSelectedTab('receivedOffers')}
    >
      Teklif Aldıklarım
    </button>
    <button
      type="button"
      className={selectedTab === 'givenOffers' ? 'tab selected' : 'tab'}
      onClick={() => setSelectedTab('givenOffers')}
    >
      Teklif Verdiklerim
    </button>
  </div>
);
OfferTabs.propTypes = {
  selectedTab: propTypes.string.isRequired,
  setSelectedTab: propTypes.func.isRequired,
};

export default OfferTabs;
