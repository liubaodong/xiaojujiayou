import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import '@/assets/scss/global.scss'
import './components'
import vant from 'vant';
import 'vant/lib/index.css';

Vue.use(vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
