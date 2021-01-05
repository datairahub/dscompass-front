import API from '@/services/api/ApiService';
import HttpService from '@/services/http/HttpService';

const Login = {
  state: {
    accessToken: null,
  },
  mutations: {
    /**
     * Update store tokens
     */
    updateToken(state, access) {
      state.accessToken = access;
      API.setToken(access);
    },
  },
  actions: {
    /**
     * Login user
     */
    login(commit, { password, email }) {
      return new Promise((resolve, reject) => {
        HttpService.post(API.get('login'), { password, email }, { withCredentials: true })
          .then((response) => {
            this.commit('updateToken', response.data.access);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /**
     * Log out user
     */
    logout() {
      return new Promise((resolve) => {
        HttpService.post(API.get('logout'), {}, { withCredentials: true })
          .then(() => {
            this.commit('updateToken', null);
            resolve();
          });
      });
    },
    /**
     * Pre Login: Obtain access token from refresh token
     */
    prelogin() {
      return new Promise((resolve, reject) => {
        HttpService.post(API.get('refreshToken'), {}, API.getHeaders())
          .then((response) => {
            this.commit('updateToken', response.data.access);
            resolve(response);
          })
          .catch((response) => { reject(response); });
      });
    },
    /**
     * Register user
     */
    register(commit, data) {
      return new Promise((resolve, reject) => {
        HttpService.post(API.get('users'), data, API.getHeaders())
          .then((response) => {
            resolve(response);
          })
          .catch(() => {
            reject();
          });
      });
    },
  },
  getters: {
    accessToken(state) {
      return state.accessToken;
    },
    userIsLogged(state) {
      return state.accessToken !== null;
    },
  },
};

export default Login;
