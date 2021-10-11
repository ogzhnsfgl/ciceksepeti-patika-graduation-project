import axios from '../../node_modules/axios/index';

/* Create Axios request template to use all request process */

const request = axios.create({
  baseURL: 'http://bootcampapi.techcs.io/api/fe/v1',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});

export default request;
