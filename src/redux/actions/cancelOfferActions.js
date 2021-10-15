import triggerToast from 'helpers/toastify';
import cancelOfferTypes from 'redux/constants/cancelOfferTypes';
import authRequest from 'service/authRequest';

import fetchProductDetail from './productDetailAction';

const deleteCancelOfferPending = () => ({
  type: cancelOfferTypes.DELETE_CANCEL_OFFER_PENDING,
});
const deleteCancelOfferSuccess = (cancelOffer) => ({
  type: cancelOfferTypes.DELETE_CANCEL_OFFER_SUCCESS,
  payload: cancelOffer,
});

const deleteCancelOfferFailure = (error) => ({
  type: cancelOfferTypes.DELETE_CANCEL_OFFER_FAILURE,
  payload: error,
});

const deleteCancelOffer = (offerId, productId) => async (dispatch) => {
  dispatch(deleteCancelOfferPending());
  authRequest()
    .delete(`/account/cancel-offer/${offerId}`, {
      Authorization: `Bearer ${localStorage.getItem('isAuthenticated')}`,
    })
    .then((res) => {
      dispatch(deleteCancelOfferSuccess(res.data));
      triggerToast('success', 'Teklif geri çekildi!');
    })
    .catch((err) => {
      triggerToast('error', err.response.data.message);
      dispatch(deleteCancelOfferFailure(err));
    })
    .finally(() => dispatch(fetchProductDetail(productId)));
};

export default deleteCancelOffer;
