import './addProductResult.scss';

import Button from 'components/Button/Button';
import Navbar from 'components/Navbar/Navbar';
import UseCreateProduct from 'Hooks/UseCreateProduct';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postCreateProductReset } from 'redux/actions/createProductActions';

const AddProductResult = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const createProduct = UseCreateProduct();
  const { product } = createProduct;

  const handleClick = (route) => {
    if (route === 'home') {
      history.push('/');
    }
    if (route === 'product') {
      history.push(`productdetail/${product.id}`);
    }
    dispatch(postCreateProductReset());
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="product-added-success">
          <p className="add-product-title">Ürün Başarıyla Oluşturuldu!</p>
          <div
            className="product-info-wrapper"
            onClick={() => handleClick('product')}
            role="none"
          >
            <img src={product.imageUrl} alt="productimage" />
            <p>{product.title}</p>
          </div>
          <div className="btn-wrapper">
            <Button
              text="Anasayfaya Dön"
              className="btn btn-home"
              clickEvent={() => handleClick('home')}
            />
            <Button
              text="Ürün Sayfasına Git"
              className="btn btn-product"
              clickEvent={() => handleClick('product')}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductResult;
