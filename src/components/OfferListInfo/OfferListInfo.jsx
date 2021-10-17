import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import propTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import putAcceptOffer from 'redux/actions/acceptOfferActions';
import postRejectOffer from 'redux/actions/rejectOfferAction';

const OfferListInfo = ({ type, item }) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  const givenOffered = () => (
    <p className="text-offered">Satıcıdan bilgi bekleniyor</p>
  );

  const givenAccepted = () => (
    <>
      <button
        type="button"
        className="btn-accept"
        onClick={() => {
          setModalShow(true);
        }}
      >
        Satın Al
      </button>
      <p className="text-confirm">Onaylandı</p>
      <ConfirmModal
        showModal={modalShow}
        closeModal={() => setModalShow(false)}
        id={item.product.id}
      />
    </>
  );
  const givenRejected = () => <p className="text-rejected">Rededildi</p>;

  const givenPurchased = () => <p className="text-purchased">Satın alındı</p>;

  const receivedOffered = () => (
    <>
      <button
        type="button"
        className="btn-accept"
        onClick={() => {
          dispatch(putAcceptOffer(item.id));
        }}
      >
        Onayla
      </button>
      <button
        type="button"
        className="btn-reject"
        onClick={() => {
          dispatch(postRejectOffer(item.id));
        }}
      >
        Reddet
      </button>
    </>
  );

  const receivedRejected = () => <p className="text-rejected">Rededildi</p>;
  const receivedAccepted = () => <p className="text-confirm">Onaylandı</p>;
  const receivedPurchased = () => <p className="text-purchased">Satıldı</p>;

  switch (type) {
    case 'givenOffers':
      switch (item.status) {
        case 'offered':
          return givenOffered();

        case 'accepted':
          if (item.isSold === 'sold') {
            return givenPurchased();
          }
          return givenAccepted();

        default:
          return givenRejected();
      }

    case 'receivedOffers':
      if (item.isSold) {
        return receivedPurchased();
      }
      switch (item.status) {
        case 'accepted':
          return receivedAccepted();
        case 'rejected':
          return receivedRejected();
        default:
          return receivedOffered();
      }
    default:
      return null;
  }
};

OfferListInfo.propTypes = {
  type: propTypes.string.isRequired,
  item: propTypes.object.isRequired,
};

export default OfferListInfo;
