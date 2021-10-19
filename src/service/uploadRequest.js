import axios from '../../node_modules/axios/index';

/* Create Axios request template to use all unauth request  */
const uploadRequest = () =>
  axios.create({
    baseURL: 'https://bootcampapi.techcs.io/api/fe/v1',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('isAuthenticated')}`,
      'Content-Type': 'multipart/form-data',
    },
  });

export default uploadRequest;
