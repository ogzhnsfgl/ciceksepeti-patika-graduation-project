import './productDetail.scss';

import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import ErrorWrapper from 'components/Error';
import GivenOfferBadge from 'components/GivenOfferBadge';
import LoadingContainer from 'components/LoadingContainer/LoadingContainer';
import Navbar from 'components/Navbar';
import OfferModal from 'components/OfferModal/OfferModal';
import currencyFormetter from 'helpers/currenyFormater';
import UseGivenOffers from 'Hooks/UseGivenOffers';
import UseProductDetail from 'Hooks/UseProductDetail';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import putPurchase from 'redux/actions/purchaseActions';

import ProductDetailInfo from './ProductDetailInfo/ProductDetailInfo';

const ProductDetail = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetail = UseProductDetail(id);
  const givenOffers = UseGivenOffers(true);

  const { product, error: errorProductDetail } = productDetail;
  const { error: errorGivenOffers } = givenOffers;

  if (errorProductDetail || errorGivenOffers) {
    return (
      <ErrorWrapper
        errorMsg={errorProductDetail.message || errorGivenOffers.message}
      />
    );
  }

  if (!product) {
    return <LoadingContainer />;
  }

  const {
    title,
    status,
    brand,
    color,
    description,
    imageUrl,
    price,
    id: productId,
  } = product;

  const handlePurchase = () => {
    dispatch(putPurchase(productId));
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="product__detail-wrapper">
          <div className="product__detail">
            <div className="product__detail-img">
              <img src={imageUrl} alt={title} />
            </div>
            <div className="product__detail-content">
              <div className="content-title text-capitalize">{title}</div>
              <div className="info-wrapper">
                <div className="content-brand text-capitalize">
                  <span className="strong">Marka:</span>
                  {brand.title}
                </div>
                <div className="content-color text-capitalize">
                  <span className="strong">Renk:</span>
                  {color.title}
                </div>
                <div className="content-status text-capitalize">
                  <span className="strong">Kullanım Durumu:</span>
                  {status.title}
                </div>
              </div>
              <div className="content-price">
                {currencyFormetter(price)} TL
                <GivenOfferBadge id={id} />
              </div>
              <ProductDetailInfo
                setShowConfirmModal={setShowConfirmModal}
                setShowOfferModal={setShowOfferModal}
              />
              <div className="content-description">
                <p className="strong">Açıklama</p>
                <p className="content-description-text">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        showModal={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        callback={handlePurchase}
      />

      <OfferModal
        showModal={showOfferModal}
        closeModal={() => setShowOfferModal(false)}
        product={product}
      />
    </>
  );
};

export default ProductDetail;
