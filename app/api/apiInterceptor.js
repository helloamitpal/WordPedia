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
    timeout: 5000, // after this api request will be auto-cancelled
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = axiosInstance(fullUrl, options);
    const fullResponse = await res;
    return fullResponse;
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
