import triggerToast from 'helpers/toastify';
import createProductTypes from 'redux/constants/createProductTypes';
import authRequest from 'service/authRequest';

import fetchProducts from './productsAction';

const postCreateProductSuccess = (product) => ({
  type: createProductTypes.POST_CREATE_PRODUCT_SUCCESS,
  payload: product,
});
const postCreateProductFailure = (error) => ({
  type: createProductTypes.POST_CREATE_PRODUCT_FAILURE,
  payload: error,
});
const postCreateProductPending = () => ({
  type: createProductTypes.POST_CREATE_PRODUCT_PENDING,
});
export const postCreateProductReset = () => ({
  type: createProductTypes.POST_CREATE_PRODUCT_RESET,
});

const postCreateProduct = (data) => async (dispatch) => {
  dispatch(postCreateProductPending());
  authRequest()
    .post(`/product/create/`, data)
    .then((res) => {
      triggerToast('success', 'Ürün oluşturuldu!');
      dispatch(postCreateProductSuccess(res.data));
    })
    .catch((err) => {
      triggerToast('error', err.response.data.message);
      dispatch(postCreateProductFailure(err));
    })
    .finally(() => {
      fetchProducts();
    });
};

export default postCreateProduct;
