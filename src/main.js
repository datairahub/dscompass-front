import Vue from 'vue';
import IdleVue from 'idle-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';

import './styles/_index.scss';

Vue.use(IdleVue, {
  store,
  idleTime: 1000 * 60 * 10, // 10 minutes without activity
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
