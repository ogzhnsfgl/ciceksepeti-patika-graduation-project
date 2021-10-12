import axios from '../../node_modules/axios/index';

/* Create Axios request template to use all request process */
const token = localStorage.getItem('isAuthenticated');

const authRequest = axios.create({
  baseURL: 'http://bootcampapi.techcs.io/api/fe/v1',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});

export default authRequest;
