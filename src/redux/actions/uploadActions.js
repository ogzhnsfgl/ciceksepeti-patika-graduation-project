import uploadTypes from 'redux/constants/uploadTypes';

export const postUploadSuccess = (status) => ({
  type: uploadTypes.POST_UPLOAD_SUCCESS,
  payload: status,
});
export const postUploadFailure = (error) => ({
  type: uploadTypes.POST_UPLOAD_FAILURE,
  payload: error,
});
export const postUploadPending = () => ({
  type: uploadTypes.POST_UPLOAD_PENDING,
});
export const postUploadReset = () => ({
  type: uploadTypes.POST_UPLOAD_RESET,
});
