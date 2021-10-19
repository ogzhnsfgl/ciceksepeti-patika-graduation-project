import './confirmModal.scss';

import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const ConfirmModal = ({ showModal, closeModal, callback }) => {
  useEffect(() => {
    const closeOnEscapeKey = (e) => {
      if ((e.charCode || e.keyCode) === 27) {
        closeModal();
      }
    };
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [closeModal]);

  return ReactDOM.createPortal(
    <div className={showModal ? 'modal modal-show' : 'modal'}>
      <div className="modal-content">
        <div className="modal-content-title" id="confirm-modal-title">
          <h2>Satın Al</h2>
        </div>
        <div className="modal-content-body">
          <p>Satın almak istiyor musunuz?</p>
        </div>
        <div className="modal-content-footer">
          <button
            type="button"
            className="btn btn-cancel"
            onClick={() => closeModal()}
          >
            Vazgeç
          </button>
          <button
            type="button"
            className="btn btn-confirm"
            onClick={() => {
              callback();
              closeModal();
            }}
          >
            Satın Al
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('root')
  );
};

ConfirmModal.propTypes = {
  showModal: propTypes.bool,
  closeModal: propTypes.func,
  callback: propTypes.func.isRequired,
};
ConfirmModal.defaultProps = {
  showModal: false,
  closeModal: null,
};

export default ConfirmModal;
