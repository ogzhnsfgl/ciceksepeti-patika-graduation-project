/* eslint-disable react/prop-types */
import ComboboxCopy from 'components/Combobox/';
import ToggleSwitch from 'components/ToggleSwitch/';
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
    <div className="form-row-multi">
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
      {errors?.price && <span>Lütfen geçerli bir tutar giriniz.</span>}
    </div>
    <div className="form-row offer-row">
      <label htmlFor="offeropt">Teklif Opsiyonu</label>
      <ToggleSwitch value={values.isOfferable} onChange={handleChange} />
    </div>
  </div>
);

export default AddProductForm;
