import HttpService from '@/services/http/HttpService';
import UrlService from '@/services/url/UrlService';
import API from '@/services/api/ApiService';
import models from './apps.models';

const URL = new UrlService();

const Apps = {
  state: { ...models },
  mutations: {
    /**
     * Update state
     * (save document on store)
     */
    updateModel(state, { model, data }) {
      state[model] = data;
    },
    /**
     * Partial update state
     * (save partial document on store)
     */
    patchModel(state, payload) {
      Object.keys(payload.data).forEach((k) => {
        state[payload.model][k] = payload.data[k];
      });
    },
  },
  actions: {
    handleSuccess(commit, { response, data }) {
      if (response && data.updateModel) {
        this.commit('updateModel', {
          model: data.model,
          data: response.data,
        });
      }
    },
    handleError(commit, { response }) {
      if (response.status === 403) {
        this.$router.push({ name: 'logout' });
      }
    },
    /**
     * Update document on store
     */
    put(commit, data) {
      this.commit('updateModel', {
        model: data.model,
        data: data.data,
      });
    },
    /**
     * Partial update document on store
     */
    patch(commit, data) {
      this.commit('patchModel', {
        model: data.model,
        data: data.data,
      });
    },
    /**
     * Remove document from store
     * (sets default state from models.js)
     */
    empty(commit, data) {
      this.commit('updateModel', {
        model: data.model,
        data: { ...models[data.model] },
      });
    },
    /**
     * Retrieve document
     */
    get(dispatch, data) {
      return new Promise((resolve, reject) => {
        HttpService.get(`${API.get(data.model)}${data.id}/`, API.getHeaders())
          .then((response) => {
            resolve(response);
          }).catch((response) => {
            this.dispatch('handleError', { response, data });
            reject();
          });
      });
    },
    /**
     * List documents
     */
    list(commit, data) {
      return new Promise((resolve, reject) => {
        let endpoint = API.get(data.model);
        if (data.params) endpoint += URL.objectToQuerystring(data.params);

        HttpService.get(endpoint, API.getHeaders())
          .then((response) => {
            this.dispatch('handleSuccess', { response, data });
            resolve(response);
          })
          .catch((response) => {
            this.dispatch('handleError', { response, data });
            reject();
          });
      });
    },
    /**
     * Create new document
     */
    create(commit, data) {
      return new Promise((resolve, reject) => {
        HttpService.post(API.get(data.model), data.data, API.getHeaders())
          .then((response) => {
            this.dispatch('handleSuccess', { response, data });
            resolve(response);
          })
          .catch((response) => {
            this.dispatch('handleError', { response, data });
            reject();
          });
      });
    },
    /**
     * Update document
     */
    update(commit, data) {
      return new Promise((resolve, reject) => {
        HttpService.put(
          `${API.get(data.model)}${data.id}/`,
          data.data,
          API.getHeaders(),
        ).then((response) => {
          resolve(response);
        }).catch((response) => {
          this.dispatch('handleError', { response, data });
          reject();
        });
      });
    },
    /**
     * Partial update document
     */
    partial_update(commit, data) {
      return new Promise((resolve, reject) => {
        HttpService.patch(
          `${API.get(data.model)}${data.id}/`,
          data.data,
          API.getHeaders(),
        ).then((response) => {
          resolve(response);
        }).catch((response) => {
          this.dispatch('handleError', { response, data });
          reject();
        });
      });
    },
    /**
     * Delete document
     */
    remove(commit, data) {
      return new Promise((resolve, reject) => {
        HttpService.delete(`${API.get(data.model)}${data.id}/`, API.getHeaders())
          .then((response) => {
            this.dispatch('handleSuccess', { response, data });
            resolve(response);
          })
          .catch((response) => {
            this.dispatch('handleError', { response, data });
            reject();
          });
      });
    },
  },
  getters: {
    /* eslint-disable no-multi-spaces */
    forms(state) {         return state.forms;        },
    form(state) {          return state.form;         },
    formanswers(state) {   return state.formanswers;  },
    formanswer(state) {    return state.formanswer;   },
    // answeredform(state) {  return state.answeredform; },
    /* eslint-enable no-multi-spaces */
  },
};

export default Apps;
