import './offerModal.scss';

import currencyFormetter from 'helpers/currenyFormater';
import checkValidField from 'helpers/formValidation';
import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import postOffer from 'redux/actions/offerActions';

const OfferModal = ({ showModal, closeModal, product }) => {
  const dispatch = useDispatch();
  const { imageUrl, title, price } = product;
  const [selectedOption, setSelectedOption] = useState(0);
  const [customPrice, setCustomPrice] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [offerBody, setOfferBody] = useState({ offeredPrice: 0 });

  useEffect(() => {
    setIsValid(checkValidField('price', customPrice));
  }, [customPrice]);

  useEffect(() => {
    switch (selectedOption) {
      case 0:
        setOfferBody({ offeredPrice: product.price * 0.2 });
        break;
      case 1:
        setOfferBody({ offeredPrice: product.price * 0.3 });
        break;
      case 2:
        setOfferBody({ offeredPrice: product.price * 0.4 });
        break;
      default:
        setOfferBody({ offeredPrice: parseFloat(customPrice) });
        break;
    }

    return () => {};
  }, [customPrice, product.price, selectedOption]);

  useEffect(() => {
    const closeOnEscapeKey = (e) => {
      if (showModal) {
        if ((e.charCode || e.keyCode) === 27) {
          closeModal();
        }
      }
    };
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [closeModal, showModal]);

  const handleSubmit = () => {
    if (selectedOption === 3 && isValid && customPrice !== '') {
      dispatch(postOffer(product.id, offerBody));
      closeModal();
    }
    if (selectedOption !== 3) {
      dispatch(postOffer(product.id, offerBody));
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    <div className={showModal ? 'modal modal-show' : 'modal'} id="offer-modal">
      <div className="modal-content">
        <div className="modal-content-title">
          <h2>Teklif Ver</h2>
          <span onClick={() => closeModal()} role="none">
            X
          </span>
        </div>
        <div className="modal-content-body">
          <div className="product-info">
            <div className="product-info-left">
              <img src={imageUrl} alt="product-img" />

              <p className="title">{title}</p>
            </div>
            <p className="price">{`${currencyFormetter(price)} TL`}</p>
          </div>
          <div className="offer-options">
            <div
              role="none"
              onClick={() => setSelectedOption(0)}
              className={`option ${selectedOption === 0 ? 'selected' : ''}`}
            >
              <span className="checkbox" />
              <span>%20&apos;si Kadar Teklif Ver</span>
            </div>
            <div
              role="none"
              onClick={() => setSelectedOption(1)}
              className={`option ${selectedOption === 1 ? 'selected' : ''}`}
            >
              <span className="checkbox" />
              <span>%30&apos;u Kadar Teklif Ver</span>
            </div>
            <div
              role="none"
              onClick={() => setSelectedOption(2)}
              className={`option ${selectedOption === 2 ? 'selected' : ''}`}
            >
              <span className="checkbox" />
              <span>%40&apos;i Kadar Teklif Ver</span>
            </div>
            <div
              role="none"
              onClick={() => setSelectedOption(3)}
              className={`option custom-offer ${
                selectedOption === 3 && isValid ? 'selected' : ''
              } ${selectedOption === 3 && !isValid ? 'selected-notValid' : ''}

              `}
            >
              <div className="custom-offer">
                <input
                  type="text"
                  name="offeredPrice"
                  placeholder="Teklif belirle"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                />
                <p>TL</p>
              </div>
            </div>
            {selectedOption === 3 && !isValid && (
              <span className="validation-warning">
                Geçerli bir tutar giriniz! (Örnek: 1234.56)
              </span>
            )}
          </div>
        </div>
        <div className="modal-content-footer">
          <button
            type="button"
            className="btn btn-offer"
            onClick={() => {
              handleSubmit();
            }}
          >
            Onayla
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('root')
  );
};

OfferModal.propTypes = {
  showModal: propTypes.bool.isRequired,
  closeModal: propTypes.func.isRequired,
  id: propTypes.number,
};

export default OfferModal;
