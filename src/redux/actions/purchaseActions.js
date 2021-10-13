import purchaseTypes from 'redux/constants/purchaseTypes';
import authRequest from 'service/authRequest';

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
  return authRequest
    .put(`/product/purchase/${id}`)
    .then((res) => {
      dispatch(putPurchaseSuccess(res.data));
    })
    .catch((err) => dispatch(putPurchaseFailure(err)));
};

export default putPurchase;
