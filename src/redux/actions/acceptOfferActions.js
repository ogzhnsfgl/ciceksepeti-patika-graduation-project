import acceptOfferTypes from 'redux/constants/acceptOfferTypes';
import authRequest from 'service/authRequest';

const putAcceptOfferPending = () => ({
  type: acceptOfferTypes.PUT_ACCEPT_OFFER_PENDING,
});
const putAcceptOfferSuccess = (acceptOffer) => ({
  type: acceptOfferTypes.PUT_ACCEPT_OFFER_SUCCESS,
  payload: acceptOffer,
});

const putAcceptOfferFailure = (error) => ({
  type: acceptOfferTypes.PUT_ACCEPT_OFFER_FAILURE,
  payload: error,
});

const putAcceptOffer = (id) => async (dispatch) => {
  dispatch(putAcceptOfferPending());
  return authRequest
    .put(`/account/accept-offer/${id}`)
    .then((res) => dispatch(putAcceptOfferSuccess(res.data)))
    .catch((err) => dispatch(putAcceptOfferFailure(err)));
};

export default putAcceptOffer;
