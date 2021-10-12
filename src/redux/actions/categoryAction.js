import categoryTypes from 'redux/constants/categoryTypes';
import request from 'service/request';

const fetchCategorySuccess = (categoryList) => ({
  type: categoryTypes.FETCH_CATEGORY_SUCCESS,
  payload: categoryList,
});

const fetchCategoryPending = () => ({
  type: categoryTypes.FETCH_CATEGORY_PENDING,
});
const fetchCategoryFailure = (error) => ({
  type: categoryTypes.FETCH_CATEGORY_FAILURE,
  payload: error,
});

const fetchCategory = () => async (dispatch) => {
  dispatch(fetchCategoryPending());

  return request
    .get('/detail/category/all')
    .then((res) => dispatch(fetchCategorySuccess(res.data)))
    .catch((err) => dispatch(fetchCategoryFailure(err)));
};

export default fetchCategory;
