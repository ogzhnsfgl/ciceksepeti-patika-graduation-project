import './addProduct.scss';

import Combobox from 'components/Combobox/Combobox';
import ImageUploader from 'components/ImageUploader/';
import Navbar from 'components/Navbar/Navbar';
import Spinner from 'components/Spinner/Spinner';
import ToggleSwitch from 'components/ToggleSwitch/';
import checkValidField from 'helpers/formValidation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fetchBrand from 'redux/actions/brandActions';
import fetchCategory from 'redux/actions/categoryAction';
import fetchcolor from 'redux/actions/colorActions';
import postCreateProduct, {
  postCreateProductReset,
} from 'redux/actions/createProductActions';
import fetchStatus from 'redux/actions/statusActions';
import { postUploadReset } from 'redux/actions/uploadActions';
import { v4 as uuidv4 } from 'uuid';

function AddProduct() {
  const history = useHistory();
  const categoryState = useSelector((state) => state.category);
  const brandState = useSelector((state) => state.brand);
  const colorState = useSelector((state) => state.color);
  const statusState = useSelector((state) => state.status);
  const imageURL = useSelector((state) => state.upload.imageURL);
  const createProduct = useSelector((state) => state.createProduct);
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [offerable, setOfferable] = useState(false);
  const [price, setPrice] = useState('');
  const [priceValidation, setPriceValidation] = useState(true);
  const [emptyRequiredField, setEmptyRequiredField] = useState({
    name: false,
    description: false,
    category: false,
    status: false,
    img: false,
    price: false,
    brand: false,
    color: false,
  });

  useEffect(() => {
    let mounted = false;

    if (
      !mounted &&
      !categoryState.categoryList &&
      !brandState.brandList &&
      !colorState.colorList &&
      !statusState.statusList
    ) {
      dispatch(fetchBrand());
      dispatch(fetchcolor());
      dispatch(fetchCategory());
      dispatch(fetchStatus());
    }
    return () => {
      mounted = true;
    };
  }, [
    brandState.brandList,
    categoryState.categoryList,
    colorState.colorList,
    dispatch,
    statusState.statusList,
  ]);

  useEffect(() => {
    if (createProduct.product !== null) {
      history.push('/');
      dispatch(postCreateProductReset());
    }
  }, [createProduct.product, dispatch, history]);

  if (
    categoryState.categoryList === null ||
    brandState.brandList === null ||
    colorState.colorList === null ||
    statusState.statusList === null
  ) {
    return <Spinner />;
  }

  const checkAllFields = () => {
    let check = true;
    if (selectedStatus === null) {
      setEmptyRequiredField((prev) => ({ ...prev, status: true }));
      check = false;
    }
    if (selectedCategory === null) {
      setEmptyRequiredField((prev) => ({ ...prev, category: true }));
      check = false;
    }
    if (selectedBrand === null) {
      setEmptyRequiredField((prev) => ({ ...prev, brand: true }));
      check = false;
    }
    if (selectedColor === null) {
      setEmptyRequiredField((prev) => ({ ...prev, color: true }));
      check = false;
    }
    if (productName === '') {
      setEmptyRequiredField((prev) => ({ ...prev, name: true }));
      check = false;
    }
    if (productDescription === '') {
      setEmptyRequiredField((prev) => ({ ...prev, description: true }));
      check = false;
    }
    if (!imageURL) {
      setEmptyRequiredField((prev) => ({ ...prev, img: true }));
      check = false;
    }
    if (price === '') {
      setEmptyRequiredField((prev) => ({ ...prev, price: true }));
      check = false;
    }
    return check;
  };

  const submitFormHandler = () => {
    if (checkAllFields()) {
      const newProduct = {
        price: parseFloat(price),
        imageUrl: imageURL.url,
        title: productName,
        status: selectedStatus,
        color: selectedColor,
        brand: selectedBrand,
        category: selectedCategory,
        description: productDescription,
        isOfferable: offerable,
      };
      dispatch(postUploadReset());
      dispatch(postCreateProduct(newProduct));
    }
  };
  const comboboxes = [
    [
      {
        label: 'Kategori',
        list: categoryState.categoryList,
        setSelect: setSelectedCategory,
        defaultVal: 'Kategori Seç',
        emptyReqField: emptyRequiredField.category,
        setRequired: setEmptyRequiredField,
        name: 'category',
      },
      {
        label: 'Marka',
        list: brandState.brandList,
        setSelect: setSelectedBrand,
        defaultVal: 'Marka Seç',
        emptyReqField: emptyRequiredField.brand,
        setRequired: setEmptyRequiredField,
        name: 'brand',
      },
    ],
    [
      {
        label: 'Renk',
        list: colorState.colorList,
        setSelect: setSelectedColor,
        defaultVal: 'Renk Seç',
        emptyReqField: emptyRequiredField.color,
        setRequired: setEmptyRequiredField,
        name: 'color',
      },
      {
        label: 'Kullanım Durumu',
        list: statusState.statusList,
        setSelect: setSelectedStatus,
        defaultVal: 'Kullanım Durumu Seç',
        emptyReqField: emptyRequiredField.status,
        setRequired: setEmptyRequiredField,
        name: 'status',
      },
    ],
  ];
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
                  name="urunAd"
                  id="urunAd"
                  value={productName}
                  onChange={(e) => {
                    setProductName(e.target.value);
                    setEmptyRequiredField((prev) => ({ ...prev, name: false }));
                  }}
                  placeholder="Örnek: Iphone 12 Pro Max"
                  maxLength="100"
                  className={emptyRequiredField.name ? 'not-valid' : ''}
                />
              </div>
              <div className="form-row">
                <label htmlFor="aciklama">Açıklama</label>
                <textarea
                  name="aciklama"
                  id="aciklama"
                  placeholder="Ürün açıklaması giriniz"
                  value={productDescription}
                  maxLength="500"
                  onChange={(e) => {
                    setProductDescription(e.target.value);
                    setEmptyRequiredField((prev) => ({
                      ...prev,
                      description: false,
                    }));
                  }}
                  className={emptyRequiredField.description ? 'not-valid' : ''}
                />
              </div>
              {comboboxes.map((comboboxGroup) => (
                <div className="form-row-multi" key={uuidv4()}>
                  {comboboxGroup.map((combobox) => {
                    const {
                      label,
                      list,
                      setSelect,
                      defaultVal,
                      emptyReqField,
                      setRequired,
                      name,
                    } = combobox;
                    return (
                      <div className="input-group" key={combobox.label}>
                        <label htmlFor="marka">{label}</label>
                        <Combobox
                          list={list}
                          setSelect={setSelect}
                          defaultVal={defaultVal}
                          emptyRequiredField={emptyReqField}
                          setRequired={setRequired}
                          name={name}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
              <div className="form-row price-row">
                <label htmlFor="price">Fiyat</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className={
                    !priceValidation || emptyRequiredField.price
                      ? 'not-valid'
                      : 'price'
                  }
                  placeholder="Bir fiyat girin"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    setPriceValidation(
                      checkValidField('price', e.target.value)
                    );
                    setEmptyRequiredField((prev) => ({
                      ...prev,
                      price: false,
                    }));
                  }}
                />
                <p className={!priceValidation ? 'not-valid-ico' : ''}>TL</p>
                {!priceValidation && (
                  <span>Lütfen geçerli bir tutar giriniz.</span>
                )}
              </div>
              <div className="form-row offer-row">
                <label htmlFor="offeropt">Teklif Opsiyonu</label>
                <ToggleSwitch value={offerable} onChange={setOfferable} />
              </div>
            </div>
            <ImageUploader
              emptyRequiredField={emptyRequiredField.img}
              setRequired={setEmptyRequiredField}
            />
          </div>

          <button
            className="btn-save"
            type="button"
            onClick={() => submitFormHandler()}
          >
            Kaydet
          </button>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
