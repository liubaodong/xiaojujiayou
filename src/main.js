import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import '@/assets/scss/global.scss'
import './components'
import Vant from 'vant';
// 引入全部样式
import 'vant/lib/index.css';
import 'vant/lib/index.less';
Vue.use(Vant);
import { Dialog } from 'vant';

Vue.use(Dialog);
import '@/assets/svgIcon'// svg图标
import '@/utils'
import instance from '@/utils/request'
import axios from 'axios'
import wx from "weixin-jsapi";
Vue.prototype.$request = instance
Vue.prototype.$axios = axios
Vue.prototype.$wx = wx

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
