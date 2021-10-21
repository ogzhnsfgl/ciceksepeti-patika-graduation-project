import './account.scss';

import profilePicture from 'assets/icons/profile-picture.png';
import Error from 'components/Error/Error';
import LoadingContainer from 'components/LoadingContainer/LoadingContainer';
import Navbar from 'components/Navbar/Navbar';
import OfferListItem from 'components/OfferListItem/OfferListItem';
import OfferTabs from 'components/OfferTabs/OfferTabs';
import UseGivenOffers from 'Hooks/UseGivenOffers';
import UseReceivedOffers from 'Hooks/UseReceivedOffer';
import React, { useState } from 'react';

const Account = () => {
  const givenOffersState = UseGivenOffers(false);
  const receivedOffersState = UseReceivedOffers();
  const [selectedTab, setSelectedTab] = useState('receivedOffers');

  let renderList;

  if (selectedTab === 'receivedOffers') {
    renderList = receivedOffersState.receivedOffers;
  }

  if (selectedTab === 'givenOffers') {
    renderList = givenOffersState.givenOffers;
  }

  if (givenOffersState.error || receivedOffersState.error) {
    <Error
      errorMsg={
        givenOffersState.error.message || receivedOffersState.error.message
      }
    />;
  }

  if (!givenOffersState.givenOffers || !receivedOffersState.receivedOffers) {
    <LoadingContainer />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="account__info">
          <div className="account__info-wrapper">
            <img src={profilePicture} alt="profile-pic" />
            <p>{localStorage.getItem('email')}</p>
          </div>
        </div>
        <div className="account__content">
          <div className="account__content-wrapper">
            <OfferTabs
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
            <div className="offer-list">
              {renderList &&
                renderList.map((offer) => (
                  <OfferListItem
                    item={offer}
                    type={selectedTab}
                    key={offer.id}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
