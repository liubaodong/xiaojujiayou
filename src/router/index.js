import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Login = () => import('@/views/login')
const OrangeList = () => import('@/views/orange-list')
const OrangeListDetail = () => import('@/views/orange-list/list-detail')

const routes = [{
  path: '/',
  name: 'login',
  component: Login,
  children: [

  ]
},
{
  path: '/orange-list',
  component: OrangeList,
  children: [
  ]
},
{
  path: '/orange-list/detail',
  component: OrangeListDetail
},
// 重定向路由
{
  path: '*',
  redirectTo: '/'
}

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
