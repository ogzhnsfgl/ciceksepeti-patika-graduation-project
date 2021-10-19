import Button from 'components/Button/Button';
import checkAuth from 'helpers/checkAuth';
import propTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import deleteCancelOffer from 'redux/actions/cancelOfferActions';

const ProductDetailInfo = ({ setShowConfirmModal, setShowOfferModal }) => {
  const product = useSelector((state) => state.productDetail.product);
  const givenOffers = useSelector((state) => state.givenOffers.givenOffers);

  const dispatch = useDispatch();
  console.log(`product`, product);

  if (!checkAuth()) {
    return (
      <div className="content-buttons">
        <>
          <div className="text-signin">
            Satın almak veya teklif vermek için lütfen önce{' '}
            <Link to="/signin" className="strong">
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
        <Button text="Bu Ürün Satışta Değil" className="btn btn-soldout" />
      </div>
    );
  }
  let givenOffer;
  givenOffers?.forEach((offer) => {
    if (offer?.product.id.trim() === product.id.trim()) {
      givenOffer = offer;
    }
    return null;
  });
  return (
    <>
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
