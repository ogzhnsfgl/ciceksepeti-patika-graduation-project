import './productDetail.scss';

import Button from 'components/Button/Button';
import Navbar from 'components/Navbar';
import currencyFormetter from 'helpers/currenyFormater';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import fetchProductDetail from 'redux/actions/productDetailAction';

const ProductDetail = () => {
  const { id } = useParams();
  const productDetail = useSelector((state) => state.productDetail);
  const dispatch = useDispatch();

  const { isPending, product, error } = productDetail;

  useEffect(() => {
    let mounted = false;
    if (!mounted) {
      dispatch(fetchProductDetail(id));
    }
    return () => {
      mounted = true;
    };
  }, [dispatch, id]);

  if (isPending && product === null) {
    return (
      <>
        <Navbar />
        <div>Yükleniyor..</div>;
      </>
    );
  }
  if (error) {
    return (
      <>
        <Navbar />
        <div>error:{error.message}</div>;
      </>
    );
  }
  const { title, status, brand, color, description, imageUrl, price } = product;

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
            <div className="content-buttons">
              <Button text="Satın Al" className="btn btn-buy" />
              <Button text="Teklif Ver" className="btn btn-offer" />
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
