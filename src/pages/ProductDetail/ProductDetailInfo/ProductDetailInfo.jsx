import Button from 'components/Button/Button';
import checkAuth from 'helpers/checkAuth';
import currencyFormetter from 'helpers/currenyFormater';
import propTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import deleteCancelOffer from 'redux/actions/cancelOfferActions';

const ProductDetailInfo = ({ setShowConfirmModal, setShowOfferModal }) => {
  const givenOffers = useSelector((state) => state.givenOffers.givenOffer);
  const product = useSelector((state) => state.productDetail.product);

  const dispatch = useDispatch();

  let givenOffer;
  givenOffers?.forEach((offer) => {
    if (offer?.product.id.trim() === product?.id.trim()) {
      givenOffer = offer;
    }
    return null;
  });

  if (!checkAuth()) {
    return (
      <div className="content-buttons">
        <>
          <div className="text-signin">
            Satın almak veya teklif vermek için lütfen önce{' '}
            <Link to="/login" className="strong">
              giriş yapın.
            </Link>
          </div>
        </>
      </div>
    );
  }
  if (product?.isSold) {
    return (
      <div className="content-buttons">
        <>
          {givenOffer && (
            <div className="content-given-offer">
              Verilen teklif:{'  '}
              <span className="given-price">
                {currencyFormetter(givenOffer.offeredPrice)}
              </span>{' '}
            </div>
          )}
          <Button text="Bu Ürün Satışta Değil" className="btn btn-soldout" />
        </>
      </div>
    );
  }

  return (
    <>
      {givenOffer && (
        <div className="content-given-offer">
          Verilen teklif:{'  '}
          <span className="given-price">
            {currencyFormetter(givenOffer.offeredPrice)}
          </span>{' '}
        </div>
      )}

      <div className="content-buttons">
        {!product?.isSold && (
          <>
            <Button
              text="Satın Al"
              className="btn btn-buy"
              clickEvent={() => setShowConfirmModal(true)}
            />
          </>
        )}
        {product?.isOfferable && givenOffer && (
          <Button
            text="Teklifi Geri Çek"
            className="btn btn-offer"
            clickEvent={() =>
              dispatch(deleteCancelOffer(givenOffer.id, product.id))
            }
          />
        )}
        {product?.isOfferable && !givenOffer && (
          <>
            <Button
              text="Teklif Ver"
              className="btn btn-offer"
              clickEvent={() => setShowOfferModal(true)}
            />
          </>
        )}

        {!product.isOfferable && (
          <>
            <Button
              text="Bu Ürüne Teklif Verilemez"
              className="btn btn-offer btn-disabled"
            />
          </>
        )}
      </div>
    </>
  );
};

ProductDetailInfo.propTypes = {
  setShowConfirmModal: propTypes.func.isRequired,
  setShowOfferModal: propTypes.func.isRequired,
};
export default ProductDetailInfo;
