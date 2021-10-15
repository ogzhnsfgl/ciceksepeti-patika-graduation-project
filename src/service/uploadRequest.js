import axios from '../../node_modules/axios/index';

/* Create Axios request template to use all request process */
// const token = localStorage.getItem('isAuthenticated');
const uploadRequest = () =>
  axios.create({
    baseURL: 'http://bootcampapi.techcs.io/api/fe/v1',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('isAuthenticated')}`,
      'Content-Type': 'multipart/form-data',
    },
  });

export default uploadRequest;
