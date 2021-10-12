import receivedOffersTypes from 'redux/constants/givenOffersTypes';
import authRequest from 'service/authRequest';

const fetchReceivedOffersPending = () => ({
  type: receivedOffersTypes.FETCH_RECEIVED_OFFERS_PENDING,
});
const fetchReceivedOffersSuccess = (receivedOffers) => ({
  type: receivedOffersTypes.FETCH_RECEIVED_OFFERS_SUCCESS,
  payload: receivedOffers,
});

const fetchReceivedOffersFailure = (error) => ({
  type: receivedOffersTypes.FETCH_RECEIVED_OFFERS_FAILURE,
  payload: error,
});

const fetchReceivedOffers = () => async (dispatch) => {
  dispatch(fetchReceivedOffersPending());
  return authRequest
    .get('/account/received-offers')
    .then((res) => dispatch(fetchReceivedOffersSuccess(res.data)))
    .catch((err) => dispatch(fetchReceivedOffersFailure(err)));
};

export default fetchReceivedOffers;
