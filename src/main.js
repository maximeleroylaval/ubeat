// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import * as player from '@/player';

Vue.config.productionTip = false;

const globalStore = new Vue({
  data: {
    currentSong: null
  }
});

export default globalStore;

router.beforeEach((to, from, next) => {
  player.clear();
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
