import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)
const router = new VueRouter({
  //
  mode: 'history',
  base: './'
});
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
