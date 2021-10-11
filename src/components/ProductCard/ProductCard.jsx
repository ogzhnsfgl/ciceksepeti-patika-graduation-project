import './productCard.scss';

import currencyFormetter from 'helpers/currenyFormater';
import React from 'react';

const ProductCard = () => {
  const product = {
    brand: "Levi's",
    color: 'Lacivert',
    price: '13121',
    imgUrl: 'https://picsum.photos/400/600',
  };
  const { brand, color, price, imgUrl } = product;

  return (
    <div className="card__item">
      <div className="card__item-img">
        <img src={imgUrl} alt="item-img" />
      </div>
      <div className="card__item-info">
        <p className="card__item-info-brand">{brand}</p>
        <p className="card__item-info-color">
          <b>Renk: </b> {color}
        </p>
      </div>
      <div className="card__item-price">{currencyFormetter(price)}</div>
    </div>
  );
};

export default ProductCard;
