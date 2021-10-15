import triggerToast from 'helpers/toastify';
import offerTypes from 'redux/constants/offerTypes';
import authRequest from 'service/authRequest';

import fetchGivenOffers from './givenOffersActions';
import fetchProductDetail from './productDetailAction';

const postOfferSuccess = (purchase) => ({
  type: offerTypes.POST_OFFER_SUCCESS,
  payload: purchase,
});
const postOfferFailure = (error) => ({
  type: offerTypes.POST_OFFER_FAILURE,
  payload: error,
});
const postOfferPending = () => ({
  type: offerTypes.POST_OFFER_PENDING,
});

const postOffer = (id, data) => async (dispatch) => {
  dispatch(postOfferPending());
  authRequest()
    .post(`/product/offer/${id}`, data)
    .then((res) => {
      triggerToast('success', 'Teklifiniz iletildi!');
      dispatch(postOfferSuccess(res.data));
      dispatch(fetchGivenOffers());
    })
    .catch((err) => {
      dispatch(postOfferFailure(err));
      triggerToast('error', err.response.data.message);
    })
    .finally(() => {
      dispatch(fetchGivenOffers());
      fetchProductDetail(id);
    });
};

export default postOffer;
