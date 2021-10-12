import './offerListItem.scss';

import React from 'react';

const OfferListItem = () => {
  const deneme = 1;
  console.log('deneme :>> ', deneme);
  return (
    <>
      <div className="offer__item">
        <div className="offer__item-wrapper">
          <div className="offer__item-content">
            <img src="https://picsum.photos/200/300" alt="item-img" />
            <div className="offer__item-content-detail">
              <p className="product-title">Title</p>
              <p className="product-offer">
                Alınan Teklif: <span className="offer-price">122,00 TL</span>
              </p>
            </div>
          </div>
          <div className="offer__item-wrapper-btn-group">
            <button type="button" className="btn-accept">
              Onayla
            </button>
            <button type="button" className="btn-reject">
              Reddet
            </button>
            {/* <p className="text-confirm">Onaylandı</p> */}
            {/* <p className="text-rejected">Onaylandı</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferListItem;
