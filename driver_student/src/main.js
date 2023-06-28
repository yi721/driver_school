import Vue from 'vue'
import App from './App.vue'
import store from './store/index';
import './assets/css/index.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import '@/assets/js/iconfont.js'
import '@/assets/js/iconfont1.js'
import '@/assets/js/iconfont2.js'
import '@/assets/js/iconfont3.js'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')