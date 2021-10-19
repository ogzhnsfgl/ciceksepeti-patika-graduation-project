import './account.scss';

import profilePicture from 'assets/icons/profile-picture.png';
import LoadingContainer from 'components/LoadingContainer/LoadingContainer';
import Navbar from 'components/Navbar/Navbar';
import OfferListItem from 'components/OfferListItem/OfferListItem';
import OfferTabs from 'components/OfferTabs/OfferTabs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchGivenOffers from 'redux/actions/givenOffersActions';
import fetchReceivedOffers from 'redux/actions/receivedOffersAction';

const Account = () => {
  const receivedOffersState = useSelector((state) => state.receivedOffers);
  const givenOffersState = useSelector((state) => state.givenOffers);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState('receivedOffers');

  useEffect(() => {
    let mounted = false;

    if (!mounted) {
      dispatch(fetchGivenOffers());
      dispatch(fetchReceivedOffers());
    }
    return () => {
      mounted = true;
    };
  }, [dispatch]);

  let renderList;

  if (selectedTab === 'receivedOffers') {
    renderList = receivedOffersState.receivedOffers;
  }

  if (selectedTab === 'givenOffers') {
    renderList = givenOffersState.givenOffers;
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
              {(givenOffersState.isPending ||
                receivedOffersState.isPending) && <LoadingContainer />}
              {(givenOffersState.error || receivedOffersState.error) && (
                <div>Error</div>
              )}
              {renderList &&
                renderList.map((offer) => (
                  <OfferListItem item={offer} type={selectedTab} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
