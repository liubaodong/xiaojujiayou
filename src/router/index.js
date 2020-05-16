import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Login = () => import('@/views/login')
const OrangeList = () => import('@/views/orange-list')
const OrangeListDetail = () => import('@/views/orange-list/list-detail')
const OrangeListOrderDetail = () => import('@/views/orange-list/order-detail')

const routes = [
  {
    path: '/',
    redirect: "/app",
    children: [

    ]
  },
  {
    path: '/app',
    component: Login
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
  {
    path: '/orange-list/order-detail',
    component: OrangeListOrderDetail
  },
  // 重定向路由
  {
    path: '*',
    redirectTo: '/'
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
