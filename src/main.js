// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
import App from './App';
import router from './router';
import store from './store';
import './libs/reset.scss';
import './libs/icon.scss';
import * as ajax from './services';
import { Picker } from 'mint-ui';

Vue.component(Picker.name, Picker);
Vue.prototype.$ajax = ajax;
Vue.config.productionTip = false;
Vue.use(MintUi);

router.beforeEach((to, from, next) => {
  if (to.name === 'brand' ||
      to.name === 'mine' ||
      to.name === 'category' ||
      to.name === 'mall') {
    store.commit('changeHasHeader', false);
  } else {
    store.commit('changeHasHeader', true);
  }
  if (to.name === 'recommend' ||
      to.name === 'detail' ||
      to.name === 'cart' ||
      to.name === 'brand' ||
      to.name === 'mine' ||
      to.name === 'category') {
    store.commit('changeHasTabbar', true);
  } else {
    store.commit('changeHasTabbar', false);
  }
  // console.log('changeHasHeader', store.state.hasHeader);
  // console.log('changeHasTabbar', store.state.hasTabbar);
  next();
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
