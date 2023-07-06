import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store/index';
import { createApp } from 'vue'
import axios from 'axios'
import http from "@/utils/http"
// import VueAxios from 'vue-axios'

import jsCookie from 'js-cookie'
Vue.prototype.$cookie = jsCookie; 
// Vue.use(VueAxios,axios)
Vue.config.productionTip = false
Vue.prototype.$http = http;

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// Vue.prototype.$http = axios
// const app = createApp(App)
// app.config.globalProperties.$axios = axios
// app.mount('#app')
