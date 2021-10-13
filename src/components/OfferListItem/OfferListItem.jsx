import './offerListItem.scss';

import OfferListInfo from 'components/OfferListInfo/OfferListInfo';
import currencyFormetter from 'helpers/currenyFormater';
import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const OfferListItem = ({ item, type }) => {
  const { product, offeredPrice } = item;

  return (
    <>
      <div className="offer__item">
        <div className="offer__item-wrapper">
          <Link to={`productdetail/${product.id}`}>
            <div className="offer__item-content">
              <img src={product.imageUrl} alt="item-img" />
              <div className="offer__item-content-detail">
                <p className="product-title">{product.title}</p>
                <p className="product-offer">
                  {type === 'receivedOffers'
                    ? 'Alınan Teklif: '
                    : 'Verilen Teklif: '}
                  <span className="offer-price">
                    {currencyFormetter(offeredPrice)} TL
                  </span>
                </p>
              </div>
            </div>
          </Link>
          <div className="offer__item-wrapper-btn-group">
            <OfferListInfo type={type} item={item} />
          </div>
        </div>
      </div>
    </>
  );
};

OfferListItem.propTypes = {
  item: propTypes.object.isRequired,
  type: propTypes.string.isRequired,
};

export default OfferListItem;
