import './addProduct.scss';

import ComboboxCopy from 'components/Combobox/';
import ImageUploader from 'components/ImageUploader/ImageUploader';
import LoadingContainer from 'components/LoadingContainer/LoadingContainer';
import Navbar from 'components/Navbar/Navbar';
import ToggleSwitch from 'components/ToggleSwitch/';
import validateInfo from 'helpers/productAddValidator';
import useForm from 'Hooks/UseAddProductForm';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fetchBrand from 'redux/actions/brandActions';
import fetchCategory from 'redux/actions/categoryAction';
import fetchcolor from 'redux/actions/colorActions';
import { postCreateProductReset } from 'redux/actions/createProductActions';
import fetchStatus from 'redux/actions/statusActions';
import { v4 as uuidv4 } from 'uuid';

function AddProduct() {
  const history = useHistory();

  const { handleChange, handleSubmit, values, errors } = useForm(validateInfo);
  const categoryState = useSelector((state) => state.category);
  const brandState = useSelector((state) => state.brand);
  const colorState = useSelector((state) => state.color);
  const statusState = useSelector((state) => state.status);
  const createProduct = useSelector((state) => state.createProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = false;

    if (!mounted) {
      dispatch(fetchBrand());
      dispatch(fetchcolor());
      dispatch(fetchCategory());
      dispatch(fetchStatus());
    }
    return () => {
      mounted = true;
    };
  }, [dispatch]);

  useEffect(() => {
    if (createProduct.product !== null) {
      history.push('/');
      dispatch(postCreateProductReset());
    }
  }, [createProduct.product, dispatch, history]);

  const isNull = [
    categoryState.categoryList,
    brandState.brandList,
    colorState.colorList,
    statusState.statusList,
  ].some((item) => item === null);

  if (isNull) {
    return <LoadingContainer />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="add__product">
          <div className="add__product-content">
            <div className="add__product-content-detail">
              <h1>Ürün Ekle</h1>
              <div className="form-row">
                <label htmlFor="urunAd">Ürün Adı</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={values.title}
                  onChange={handleChange}
                  placeholder="Örnek: Iphone 12 Pro Max"
                  maxLength="100"
                  className={errors?.title ? 'not-valid' : ''}
                />
              </div>
              <div className="form-row">
                <label htmlFor="description">Açıklama</label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Ürün açıklaması giriniz"
                  value={values.description}
                  maxLength="500"
                  onChange={handleChange}
                  className={errors?.description ? 'not-valid' : ''}
                />
              </div>

              <div className="form-row-multi" key={uuidv4()}>
                <div className="input-group">
                  <label htmlFor="category">Kategori</label>
                  <ComboboxCopy
                    setSelect={handleChange}
                    error={errors?.category}
                    name="category"
                    value={values.category}
                    list={categoryState.categoryList}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="brand">Marka</label>
                  <ComboboxCopy
                    setSelect={handleChange}
                    error={errors?.brand}
                    name="brand"
                    value={values.brand}
                    list={brandState.brandList}
                  />
                </div>
              </div>
              <div className="form-row-multi" key={uuidv4()}>
                <div className="input-group">
                  <label htmlFor="color">Renk</label>
                  <ComboboxCopy
                    setSelect={handleChange}
                    error={errors?.color}
                    name="color"
                    value={values.color}
                    list={colorState.colorList}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="status">Kullanım Durumu</label>
                  <ComboboxCopy
                    setSelect={handleChange}
                    error={errors?.status}
                    name="status"
                    value={values.status}
                    list={statusState.statusList}
                  />
                </div>
              </div>

              <div className="form-row price-row">
                <label htmlFor="price">Fiyat</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className={errors?.price ? 'not-valid' : 'price'}
                  placeholder="Bir fiyat girin"
                  value={values.price}
                  onChange={handleChange}
                />
                <p className={errors?.price ? 'not-valid-ico' : ''}>TL</p>
                {errors?.price && (
                  <span>Lütfen geçerli bir tutar giriniz.</span>
                )}
              </div>
              <div className="form-row offer-row">
                <label htmlFor="offeropt">Teklif Opsiyonu</label>
                <ToggleSwitch
                  value={values.isOfferable}
                  onChange={handleChange}
                />
              </div>
            </div>
            <ImageUploader error={errors?.imageUrl} onChange={handleChange} />
          </div>
          <button className="btn-save" type="button" onClick={handleSubmit}>
            Kaydet
          </button>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
