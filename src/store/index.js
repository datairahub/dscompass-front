import Vue from 'vue';
import Vuex from 'vuex';
import Apps from './apps';
import Login from './login';
import Locale from './locale';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Apps,
    Login,
    Locale,
  },
});
