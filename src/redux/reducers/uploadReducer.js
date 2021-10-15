import uploadTypes from 'redux/constants/uploadTypes';

const initialState = {
  imageURL: null,
  isPending: false,
  error: false,
};

const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case uploadTypes.POST_UPLOAD_PENDING:
      return { ...state, isPending: true, imageURL: null, error: false };
    case uploadTypes.POST_UPLOAD_SUCCESS:
      return {
        ...state,
        isPending: false,
        imageURL: action.payload,
        error: false,
      };
    case uploadTypes.POST_UPLOAD_FAILURE:
      return {
        ...state,
        isPending: false,
        imageURL: null,
        error: action.payload,
      };
    case uploadTypes.POST_UPLOAD_RESET:
      return initialState;
    default:
      return state;
  }
};

export default uploadReducer;
