// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import * as cookie from '@/cookie';

Vue.config.productionTip = false;

const globalStore = new Vue({
  data: {
    currentSong: null,
  }
});

export default globalStore;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    // if user is not logged and try to access to an authenticed route
    if (cookie.getToken() === '') {
      next({ path: '/login' });
    } else {
      next();
    }
  } else if (cookie.getToken() !== '') {
    // if user is logged and try to access to an no auth route
    next('/');
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
