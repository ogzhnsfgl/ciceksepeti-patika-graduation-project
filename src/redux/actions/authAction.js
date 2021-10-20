import triggerToast from 'helpers/toastify';
import authTypes from 'redux/constants/authTypes';
import request from 'service/request';

const fetchAuthSuccess = (user) => ({
  type: authTypes.FETCH_AUTH_SUCCESS,
  payload: user,
});
const fetchAuthFailure = (error) => ({
  type: authTypes.FETCH_AUTH_FAILURE,
  payload: error,
});
const fetchAuthPending = () => ({
  type: authTypes.FETCH_AUTH_PENDING,
});

const fetchAuth = (user, signType) => async (dispatch) => {
  dispatch(fetchAuthPending());
  return request
    .post(`/authorization${signType}`, user)
    .then((res) => {
      triggerToast(
        'success',
        'Giriş başarılı anasayfaya yönlendiriliyorsunuz!'
      );
      dispatch(fetchAuthSuccess(res.data));
      localStorage.setItem('isAuthenticated', res.data.access_token);
      localStorage.setItem('email', user.email);
    })
    .catch((err) => {
      if (err.response.status === 409) {
        triggerToast('error', 'Bu kullanıcı zaten sistemde kayıtlı!');
      } else if (err.response.status === 401) {
        triggerToast('error', 'Emailiniz veya parolanız hatalı!');
      } else {
        triggerToast('error', 'Bir hata meydana geldi!');
      }
      dispatch(fetchAuthFailure(err));
    });
};

export default fetchAuth;
