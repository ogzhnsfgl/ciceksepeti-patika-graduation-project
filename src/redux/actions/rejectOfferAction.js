import rejectOfferTypes from 'redux/constants/rejectOfferTypes';
import authRequest from 'service/authRequest';

import fetchReceivedOffers from './receivedOffersAction';

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
  authRequest()
    .post(`/account/reject-offer/${id}`)
    .then((res) => {
      dispatch(postRejectOfferSuccess(res.data));
    })
    .catch((err) => dispatch(postRejectOfferFailure(err)))
    .finally(() => dispatch(fetchReceivedOffers()));
};

export default postRejectOffer;
