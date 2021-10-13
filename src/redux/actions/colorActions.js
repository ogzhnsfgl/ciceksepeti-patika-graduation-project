import colorTypes from 'redux/constants/colorTypes';
import request from 'service/request';

const fetchStatusSuccess = (color) => ({
  type: colorTypes.FETCH_COLOR_SUCCESS,
  payload: color,
});
const fetchStatusFailure = (error) => ({
  type: colorTypes.FETCH_COLOR_FAILURE,
  payload: error,
});
const fetchStatusPending = () => ({
  type: colorTypes.FETCH_COLOR_PENDING,
});

const fetchcolor =
  (id = 'all') =>
  async (dispatch) => {
    dispatch(fetchStatusPending());
    return request
      .get(`/detail/color/${id}`)
      .then((res) => {
        dispatch(fetchStatusSuccess(res.data));
      })
      .catch((err) => dispatch(fetchStatusFailure(err)));
  };

export default fetchcolor;
