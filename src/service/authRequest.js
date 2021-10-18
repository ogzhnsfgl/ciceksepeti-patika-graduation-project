import axios from '../../node_modules/axios/index';

/* Create Axios request template to use all request process */
// const token = localStorage.getItem('isAuthenticated');
const authRequest = () =>
  axios.create({
    baseURL: 'https://bootcampapi.techcs.io/api/fe/v1',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('isAuthenticated')}`,
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
    },
  });

export default authRequest;
