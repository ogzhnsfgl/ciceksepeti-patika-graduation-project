import './addProduct.scss';

import uploadIco from 'assets/icons/upload-ico.png';
import Navbar from 'components/Navbar/Navbar';
import React from 'react';

function AddProduct() {
  const lazim = 'lazım';
  console.log('lazim :>> ', lazim);
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="add__product">
          <div className="add__product-content">
            <div className="add__product-content-detail">
              <h1>Ürün Ekle</h1>
              <div className="form-row">
                <label htmlFor="urunAd">Urun Adı</label>
                <input
                  type="text"
                  name="urunAd"
                  id="urunAd"
                  placeholder="Örnek: Iphone 12 Pro Max"
                />
              </div>
              <div className="form-row">
                <label htmlFor="aciklama">Açıklama</label>
                <textarea
                  name="aciklama"
                  id="aciklama"
                  placeholder="Ürün açıklaması giriniz"
                />
              </div>

              <div className="form-row-multi">
                <div className="input-group">
                  <label htmlFor="kategori">Kategori</label>
                  <select name="kategori" id="kategori">
                    <option value="test1">test1</option>
                    <option value="test2">test2</option>
                    <option value="test3">test3</option>
                    <option value="test4">test4</option>
                  </select>
                </div>
                <div className="input-group">
                  <label htmlFor="marka">Marka</label>
                  <select name="marka" id="marka">
                    <option value="test1">test1</option>
                    <option value="test2">test2</option>
                    <option value="test3">test3</option>
                    <option value="test4">test4</option>
                  </select>
                </div>
              </div>
              <div className="form-row-multi">
                <div className="input-group">
                  <label htmlFor="renk">Renk</label>
                  <select name="renk" id="renk" className="selected">
                    <option value="" disabled hidden selected>
                      Renk seç
                    </option>
                    <option value="test1">test1</option>
                    <option value="test2">test2</option>
                    <option value="test3">test3</option>
                    <option value="test4">test4</option>
                  </select>
                </div>
                <div className="input-group">
                  <label htmlFor="status">Kullanım Durumu</label>
                  <select name="status" id="status">
                    <option value="test1">test1</option>
                    <option value="test2">test2</option>
                    <option value="test3">test3</option>
                    <option value="test4">test4</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <label htmlFor="price">Fiyat</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="Bir fiyat girin"
                />
              </div>
              <div className="form-row">
                <label htmlFor="offeropt">Teklif Opsiyonu</label>
                <input type="checkbox" name="offeropt" id="offeropt" />
              </div>
            </div>
            <div className="add__product-content-image">
              <h1>Ürün Görseli</h1>
              <div className="upload-container">
                <img src={uploadIco} alt="upload-ico" />
                <p>
                  Sürükleyip bırakarak yükle <br /> veya
                </p>
                <button className="btn-upload" type="button">
                  Görsel Seçin
                </button>
                <p className="upload-info-text">
                  PNG ve JPEG Dosya boyutu: max. 100kb
                </p>
              </div>
            </div>
          </div>
          <button className="btn-save" type="button">
            Kaydet
          </button>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
