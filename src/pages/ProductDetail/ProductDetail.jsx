/* eslint-disable no-unused-expressions */
import './productDetail.scss';

import Button from 'components/Button/Button';
import Navbar from 'components/Navbar';
import checkAuth from 'helpers/checkAuth';
import currencyFormetter from 'helpers/currenyFormater';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import fetchGivenOffers from 'redux/actions/givenOffersActions';
import fetchProductDetail from 'redux/actions/productDetailAction';

const ProductDetail = () => {
  const { id } = useParams();
  const productDetail = useSelector((state) => state.productDetail);
  const givenOffersState = useSelector((state) => state.givenOffers);
  const dispatch = useDispatch();

  const {
    isPending: isPendingProductDetail,
    product,
    error: errorProductDetail,
  } = productDetail;

  const {
    givenOffers,
    isPending: isPendingGivenOffers,
    error: errorGivenOffers,
  } = givenOffersState;

  console.log('givenOffers :>> ', givenOffers);

  useEffect(() => {
    let mounted = false;
    if (!mounted && product?.id !== id) {
      dispatch(fetchProductDetail(id));
      dispatch(fetchGivenOffers(id));
    }
    return () => {
      mounted = true;
    };
  }, [dispatch, id, product]);

  if (isPendingProductDetail || isPendingGivenOffers || product === null) {
    return (
      <>
        <Navbar />
        <div>Yükleniyor..</div>;
      </>
    );
  }
  if (errorProductDetail || errorGivenOffers) {
    return (
      <>
        <Navbar />
        <div>errorProductDetail:{errorProductDetail.message}</div>;
      </>
    );
  }
  const { title, status, brand, color, description, imageUrl, price, isSold } =
    product;

  let givenOffer;
  givenOffers?.forEach((offer) => {
    offer?.product?.id === product?.id
      ? (givenOffer = offer)
      : (givenOffer = null);
    return null;
  });

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="product__detail">
          <div className="product__detail-img">
            <img src={imageUrl} alt={title} />
          </div>
          <div className="product__detail-content">
            <div className="content-title text-capitalize">{title}</div>
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
            <div className="content-price">{currencyFormetter(price)}</div>

            {givenOffer && (
              <div className="content-given-offer">
                Verilen teklif:{'  '}
                <span className="given-price">
                  {currencyFormetter(givenOffer.offeredPrice)}
                </span>{' '}
              </div>
            )}

            <div className="content-buttons">
              {!checkAuth() && (
                <>
                  <div className="text-signin">
                    Satın almak veya teklif vermek için lütfen önce{' '}
                    <Link to="/login" className="strong">
                      giriş yapın.
                    </Link>
                  </div>
                </>
              )}
              {!isSold && product.isOfferable && checkAuth() && (
                <>
                  <Button text="Satın Al" className="btn btn-buy" />
                  {givenOffer ? (
                    <Button text="Teklifi Geri Çek" className="btn btn-offer" />
                  ) : (
                    <Button text="Teklif Ver" className="btn btn-offer" />
                  )}
                </>
              )}
              {!isSold && !product.isOfferable && checkAuth() && (
                <>
                  <Button text="Satın Al" className="btn btn-buy" />
                  <Button
                    text="Bu Ürüne Teklif Verilemez"
                    className="btn btn-offer btn-disabled"
                  />
                </>
              )}
              {isSold && checkAuth() && (
                <>
                  <Button
                    text="Bu Ürün Satışta Değil"
                    className="btn btn-soldout"
                  />
                </>
              )}
            </div>
            <div className="content-description">
              <p className="strong">Açıklama</p>
              <p className="content-description-text">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
