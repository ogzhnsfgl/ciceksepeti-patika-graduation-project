import Combobox from 'components/Combobox/';
import ToggleSwitch from 'components/ToggleSwitch/';
import propTypes from 'prop-types';
import React from 'react';

const AddProductForm = ({
  categoryState,
  brandState,
  colorState,
  statusState,
  handleChange,
  values,
  errors,
}) => (
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

    <div className="form-row-multi">
      <div className="input-group">
        <label htmlFor="category">Kategori</label>
        <Combobox
          setSelect={handleChange}
          error={errors?.category}
          name="category"
          value={values.category}
          list={categoryState.categoryList}
        />
      </div>
      <div className="input-group">
        <label htmlFor="brand">Marka</label>
        <Combobox
          setSelect={handleChange}
          error={errors?.brand}
          name="brand"
          value={values.brand}
          list={brandState.brandList}
        />
      </div>
    </div>
    <div className="form-row-multi">
      <div className="input-group">
        <label htmlFor="color">Renk</label>
        <Combobox
          setSelect={handleChange}
          error={errors?.color}
          name="color"
          value={values.color}
          list={colorState.colorList}
        />
      </div>
      <div className="input-group">
        <label htmlFor="status">Kullanım Durumu</label>
        <Combobox
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
        <span>Lütfen geçerli bir tutar giriniz. (Örnek: 123.45)</span>
      )}
    </div>
    <div className="form-row offer-row">
      {values.isOfferable ? (
        <label htmlFor="offeropt" className="offeropt-active">
          Fiyat ve teklif opsiyonu
        </label>
      ) : (
        <label htmlFor="offeropt" className="offeropt">
          Teklif Opsiyonu
        </label>
      )}
      <ToggleSwitch value={values.isOfferable} onChange={handleChange} />
    </div>
  </div>
);

AddProductForm.propTypes = {
  categoryState: propTypes.object.isRequired,
  brandState: propTypes.object.isRequired,
  colorState: propTypes.object.isRequired,
  statusState: propTypes.object.isRequired,
  handleChange: propTypes.func.isRequired,
  values: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
};

export default AddProductForm;
