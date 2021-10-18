/* eslint-disable react/prop-types */
import currencyFormetter from 'helpers/currenyFormater';
import React from 'react';
import { useSelector } from 'react-redux';

const GivenOfferBadge = ({ id }) => {
  const givenOffers = useSelector((state) => state.givenOffers.givenOffers);

  let givenOffer;

  givenOffers?.forEach((offer) => {
    if (offer?.product.id.trim() === id.trim()) {
      givenOffer = offer;
    }
    return null;
  });
  if (!givenOffer) {
    return null;
  }

  return (
    <div className="content-given-offer">
      Verilen teklif:{'  '}
      <span className="given-price">
        {currencyFormetter(givenOffer.offeredPrice)}
      </span>{' '}
    </div>
  );
};

export default GivenOfferBadge;
