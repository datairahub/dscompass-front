import axios from 'axios';
import API from '@/services/api/ApiService';
import debounce from 'debounce';

axios.interceptors.response.use((response) => response, debounce((error) => {
  const { config } = error;

  if (error.response && error.response.status !== 401) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  // Logout user if token refresh didn't work or user is disabled
  if (error.config.url === API.get('refresh')) {
    API.clearToken();
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  // Token expiration response doesn't have Content-Type header
  if (config.headers['Content-Type']) {
    if (config.url !== API.get('logout')) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  // Try request again with new token
  return axios.post(API.get('refresh'), {}, { withCredentials: true })
    .then((response) => {
      API.setToken(response.data.access);
      config.headers.Authorization = `Bearer ${response.data.access}`;
      return new Promise((resolve, reject) => {
        axios.request(config).then((r) => {
          resolve(r);
        }).catch((e) => {
          reject(e);
        });
      });
    });
}, 1000, true));

const httpClient = axios.create();

httpClient.defaults.timeout = 5 * 60 * 1000;

export default httpClient;
