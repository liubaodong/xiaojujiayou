import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Home = () => import('@/views/home')
const OrangeList = () => import('@/views/orange-list')

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/orange-list',
    component: OrangeList
  },
  // 重定向路由
  {
    path: '**',
    redirectTo: '/'
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router