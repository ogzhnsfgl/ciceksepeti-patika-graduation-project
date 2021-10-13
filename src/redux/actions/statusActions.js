import statusTypes from 'redux/constants/statusTypes';
import request from 'service/request';

const fetchStatusSuccess = (status) => ({
  type: statusTypes.FETCH_STATUS_SUCCESS,
  payload: status,
});
const fetchStatusFailure = (error) => ({
  type: statusTypes.FETCH_STATUS_FAILURE,
  payload: error,
});
const fetchStatusPending = () => ({
  type: statusTypes.FETCH_STATUS_PENDING,
});

const fetchStatus =
  (id = 'all') =>
  async (dispatch) => {
    dispatch(fetchStatusPending());
    return request
      .get(`/detail/status/${id}`)
      .then((res) => {
        dispatch(fetchStatusSuccess(res.data));
      })
      .catch((err) => dispatch(fetchStatusFailure(err)));
  };

export default fetchStatus;
