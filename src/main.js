import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
Vue.config.productionTip = false
Vue.use(VueRouter)
const router = new VueRouter({ //
  mode: 'history',
  base: './'
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
