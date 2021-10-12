import './account.scss';

import profilePicture from 'assets/icons/profile-picture.png';
import Navbar from 'components/Navbar/Navbar';
import OfferListItem from 'components/OfferListItem/OfferListItem';
import React from 'react';

const Account = () => (
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
            <p className="selected">Teklif Aldıklarım</p>
            <p>Teklif Verdiklerim</p>
          </div>
          <div className="offer-list">
            <OfferListItem />
            <OfferListItem />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Account;
