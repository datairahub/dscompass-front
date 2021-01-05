import API from '@/services/api/ApiService';
import HttpService from '@/services/http/HttpService';

const Locale = {
  state: {
    locales: [],
  },
  mutations: {
    /**
     * Update store locales
     */
    updateLocales(state, locales) {
      state.locales = locales;
    },
  },
  actions: {
    /**
     * Get locales
     */
    getLocales() {
      return new Promise((resolve, reject) => {
        HttpService.get(API.get('locales'), API.getHeaders())
          .then((response) => {
            this.commit('updateLocales', response.data);
          })
          .catch(() => {
            reject();
          });
      });
    },
  },
  getters: {
    locales(state) {
      return state.locales;
    },
  },
};

export default Locale;
