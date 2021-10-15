import triggerToast from 'helpers/toastify';
import purchaseTypes from 'redux/constants/purchaseTypes';
import authRequest from 'service/authRequest';

import fetchGivenOffers from './givenOffersActions';
import fetchProductDetail from './productDetailAction';

const putPurchaseSuccess = (purchase) => ({
  type: purchaseTypes.PUT_PURCHASE_SUCCESS,
  payload: purchase,
});
const putPurchaseFailure = (error) => ({
  type: purchaseTypes.PUT_PURCHASE_FAILURE,
  payload: error,
});
const putPurchasePending = () => ({
  type: purchaseTypes.PUT_PURCHASE_PENDING,
});

const putPurchase = (id) => async (dispatch) => {
  dispatch(putPurchasePending());
  authRequest()
    .put(`/product/purchase/${id}`)
    .then((res) => {
      triggerToast('success', 'Ürün satın alındı!');
      dispatch(putPurchaseSuccess(res.data));
      dispatch(fetchGivenOffers());
    })
    .catch((err) => {
      dispatch(putPurchaseFailure(err));
      triggerToast('error', err.response.data.message);
    })
    .finally(() => {
      dispatch(fetchGivenOffers());
      fetchProductDetail(id);
    });
};

export default putPurchase;
