import axios from '../../node_modules/axios/index';

/* Create Axios request template to use all request process */

const request = axios.create({
  baseURL: 'baseurl',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default request;
