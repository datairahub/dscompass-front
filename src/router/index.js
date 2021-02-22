import Vue from 'vue';
import VueRouter from 'vue-router';
import i18n from '@/i18n';
import store from '@/store';
import HttpService from '@/services/http/HttpService';
import API from '@/services/api/ApiService';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const storedLocales = {};

const localRegex = () => ('([A-z]{2})');

const setLocale = (to, from, next) => {
  const localecode = to.params.locale || 'es';

  if (Object.hasOwnProperty.call(storedLocales, localecode)) {
    i18n.setLocaleMessage(localecode, storedLocales[localecode] || {});
    next();
  } else {
    HttpService.get(API.get('locales'), API.getHeaders())
      .then((response) => {
        const translation = response.data.filter((l) => l.code === localecode);
        if (!translation) {
          i18n.setLocaleMessage(localecode, {});
        } else {
          const url = `${API.get('base')}${translation[0].file.substring(1)}`;
          HttpService.get(url, API.getHeaders())
            .then((resp) => {
              storedLocales[localecode] = resp.data;
              i18n.setLocaleMessage(localecode, resp.data || {});
              i18n.locale = localecode;
              next();
            });
        }
      }).catch(() => {
      });
  }
};

const routes = [
  {
    path: `/:locale${localRegex()}?`,
    name: 'home',
    component: Home,
  }, {
    path: `/:locale${localRegex()}?/tos`,
    name: 'tos',
    component: () => import(/* webpackChunkName: "tos" */ '@/views/TermsOfService.vue'),
  }, {
    path: `/:locale${localRegex()}?/login`,
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  }, {
    path: `/:locale${localRegex()}?/logout`,
    name: 'logout',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Logout.vue'),
  }, {
    path: `/:locale${localRegex()}?/quizs`,
    name: 'quizs',
    component: () => import(/* webpackChunkName: "quizs" */ '@/views/Quizs.vue'),
    meta: {
      requiresLogin: true,
    },
  }, {
    path: `/:locale${localRegex()}?/quizs/:quizid`,
    name: 'quiz-edition',
    component: () => import(/* webpackChunkName: "quizsedition" */ '@/views/QuizsEdition.vue'),
    meta: {
      requiresLogin: true,
    },
  }, {
    path: `/:locale${localRegex()}?/print`,
    name: 'print',
    component: () => import(/* webpackChunkName: "print" */ '@/views/QuizPrint.vue'),
    meta: {
      requiresLogin: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes: routes.map((route) => ({ ...route, beforeEnter: setLocale })),
  scrollBehavior: (to, from, savedPosition) => new Promise((resolve) => {
    const position = savedPosition || {};
    if (!savedPosition) {
      if (to.hash) {
        position.selector = to.hash;
      }
      position.x = 0;
      position.y = 0;
    }
    router.app.$root.$once('triggerScroll', () => {
      router.app.$nextTick(() => resolve(position));
    });
  }),
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresLogin)) {
    if (!store.getters.userIsLogged) {
      next({ name: 'login', params: to.params });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
