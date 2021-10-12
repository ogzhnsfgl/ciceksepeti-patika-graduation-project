import rejectOfferTypes from 'redux/constants/givenOffersTypes';
import authRequest from 'service/authRequest';

const postRejectOfferPending = () => ({
  type: rejectOfferTypes.POST_REJECT_OFFER_PENDING,
});
const postRejectOfferSuccess = (rejectOffer) => ({
  type: rejectOfferTypes.POST_REJECT_OFFER_SUCCESS,
  payload: rejectOffer,
});

const postRejectOfferFailure = (error) => ({
  type: rejectOfferTypes.POST_REJECT_OFFER_FAILURE,
  payload: error,
});

const postRejectOffer = (id) => async (dispatch) => {
  dispatch(postRejectOfferPending());
  return authRequest
    .post(`/account/reject-offer/${id}`)
    .then((res) => dispatch(postRejectOfferSuccess(res.data)))
    .catch((err) => dispatch(postRejectOfferFailure(err)));
};

export default postRejectOffer;
