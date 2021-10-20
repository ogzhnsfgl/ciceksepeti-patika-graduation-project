import './productDetail.scss';

import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import Error from 'components/Error/Error';
import GivenOfferBadge from 'components/GivenOfferBadge';
import LoadingContainer from 'components/LoadingContainer/LoadingContainer';
import Navbar from 'components/Navbar';
import OfferModal from 'components/OfferModal/OfferModal';
import checkAuth from 'helpers/checkAuth';
import currencyFormetter from 'helpers/currenyFormater';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import fetchGivenOffers from 'redux/actions/givenOffersActions';
import fetchProductDetail from 'redux/actions/productDetailAction';
import putPurchase from 'redux/actions/purchaseActions';

import ProductDetailInfo from './ProductDetailInfo/ProductDetailInfo';

const ProductDetail = () => {
  const { id } = useParams();
  const productDetail = useSelector((state) => state.productDetail);
  const givenOffersState = useSelector((state) => state.givenOffers);
  const dispatch = useDispatch();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);

  const {
    isPending: isPendingProductDetail,
    product,
    error: errorProductDetail,
  } = productDetail;

  const { isPending: isPendingGivenOffers, error: errorGivenOffers } =
    givenOffersState;

  useEffect(() => {
    let mounted = false;
    if (!mounted && product?.id !== id) {
      dispatch(fetchProductDetail(id));
      if (checkAuth()) {
        dispatch(fetchGivenOffers(id));
      }
    }
    return () => {
      mounted = true;
    };
  }, [dispatch, id, product]);

  if (isPendingProductDetail || isPendingGivenOffers) {
    return <LoadingContainer />;
  }

  if (errorProductDetail || errorGivenOffers) {
    return (
      <Error
        errorMsg={errorProductDetail.message || errorGivenOffers.message}
      />
    );
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
