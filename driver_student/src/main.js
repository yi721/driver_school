import Vue from 'vue'
import App from './App.vue'
import store from './store/index';
import './assets/css/index.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import http from './utils/http'

import '@/assets/js/iconfont.js'

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.config.productionTip = false
Vue.prototype.$http = http;
Vue.use(ElementUI)
Vue.use(VideoPlayer)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')