import axios from 'axios';
import config from '../config';

const axiosInstance = axios.create({
  baseURL: config.apiUrl
});

const fireRequest = async (method, fullUrl, data) => {
  const options = {
    method,
    data: JSON.stringify(data),
    mode: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    // const res = axiosInstance(fullUrl, options);
    // let response = {};
    // const fullResponse = await res;
    // response = fullResponse.data;
    // response.statusCode = fullResponse.status;
    // return response;
    return new Promise((resolve) => {
      resolve({
        data: [{
          name: 'Amit'
        }, {
          name: 'Soumya'
        }],
        statusCode: 200
      });
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  get(url) {
    return fireRequest('GET', url);
  },

  post(url, data) {
    return fireRequest('POST', url, data);
  },

  put(url, data) {
    return fireRequest('PUT', url, data);
  },

  delete(url) {
    return fireRequest('DELETE', url);
  },
  axios() {
    return axiosInstance;
  }
};
