import './productCard.scss';

import currencyFormetter from 'helpers/currenyFormater';
import propTypes from 'prop-types';
import React from 'react';

const ProductCard = ({ product }) => {
  const { brand, color, price, imageUrl } = product;

  return (
    <div className="card__item">
      <div className="card__item-img">
        <img src={imageUrl} alt="item-img" />
      </div>
      <div className="card__item-info">
        <p className="card__item-info-brand">{brand.title}</p>
        <p className="card__item-info-color">
          <b>Renk: </b> {color.title}
        </p>
      </div>
      <div className="card__item-price">{currencyFormetter(price)}</div>
    </div>
  );
};

ProductCard.propTypes = {
  product: propTypes.object.isRequired,
};

export default ProductCard;
