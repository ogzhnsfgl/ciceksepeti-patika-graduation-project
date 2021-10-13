import './account.scss';

import profilePicture from 'assets/icons/profile-picture.png';
import Navbar from 'components/Navbar/Navbar';
import OfferListItem from 'components/OfferListItem/OfferListItem';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchGivenOffers from 'redux/actions/givenOffersActions';
import fetchReceivedOffers from 'redux/actions/receivedOffersAction';

const Account = () => {
  const [selectedTab, setSelectedTab] = useState('receivedOffers');
  const receivedOffersState = useSelector((state) => state.receivedOffers);
  const givenOffersState = useSelector((state) => state.givenOffers);
  const dispatch = useDispatch();

  console.log('givenOffers :>> ', givenOffersState);
  console.log('receivedOffers :>> ', receivedOffersState);

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
            <div className="content-header">
              <button
                type="button"
                className={
                  selectedTab === 'receivedOffers' ? 'tab selected' : 'tab'
                }
                onClick={() => setSelectedTab('receivedOffers')}
              >
                Teklif Aldıklarım
              </button>
              <button
                type="button"
                className={
                  selectedTab === 'givenOffers' ? 'tab selected' : 'tab'
                }
                onClick={() => setSelectedTab('givenOffers')}
              >
                Teklif Verdiklerim
              </button>
            </div>
            <div className="offer-list">
              {(givenOffersState.isPending ||
                receivedOffersState.isPending) && <div>Loading</div>}
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
