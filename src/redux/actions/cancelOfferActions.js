import cancelOfferTypes from 'redux/constants/cancelOfferTypes';
import authRequest from 'service/authRequest';

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

const deleteCancelOffer = (id) => async (dispatch) => {
  dispatch(deleteCancelOfferPending());
  return authRequest
    .delete(`/account/cancel-offer/${id}`)
    .then((res) => dispatch(deleteCancelOfferSuccess(res.data)))
    .catch((err) => dispatch(deleteCancelOfferFailure(err)));
};

export default deleteCancelOffer;
