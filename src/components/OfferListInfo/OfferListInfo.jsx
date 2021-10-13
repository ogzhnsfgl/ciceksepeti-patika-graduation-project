// import postRejectOffer from 'redux/actions/rejectOfferAction';
import propTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import putAcceptOffer from 'redux/actions/acceptOfferActions';
import putPurchase from 'redux/actions/purchaseActions';
import postRejectOffer from 'redux/actions/rejectOfferAction';

const OfferListInfo = ({ type, item }) => {
  const [status, setStatus] = useState(item.status);

  const dispatch = useDispatch();
  console.log(status);
  console.log(type);
  console.log('item:', item);
  console.log('sold:', item.isSold);

  const givenOffered = () => (
    <p className="text-offered">Satıcıdan bilgi bekleniyor.</p>
  );
  const givenAccepted = () => (
    <>
      <button
        type="button"
        className="btn-accept"
        onClick={() => {
          dispatch(putPurchase(item.product.id));
          setStatus(item.status);
        }}
      >
        Satın Al
      </button>
      <p className="text-confirm">Onaylandı</p>
    </>
  );
  const givenRejected = () => <p className="text-rejected">Red edildi.</p>;

  const givenPurchased = () => <p className="text-purchased">Satın alındı</p>;

  const receivedOffered = () => (
    <>
      <button
        type="button"
        className="btn-accept"
        onClick={() => {
          dispatch(putAcceptOffer(item.id));
          setStatus(item.status);
        }}
      >
        Onayla
      </button>
      <button
        type="button"
        className="btn-reject"
        onClick={() => {
          dispatch(postRejectOffer(item.id));
          setStatus(item.status);
        }}
      >
        Reddet
      </button>
    </>
  );

  const receivedRejected = () => <p className="text-rejected">Red edildi</p>;
  const receivedAccepted = () => <p className="text-accepted">Onaylandı</p>;

  switch (type) {
    case 'givenOffers':
      switch (status) {
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
      switch (status) {
        case 'offered':
          return receivedOffered();
        case 'rejected':
          return receivedRejected();
        default:
          return receivedAccepted();
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
