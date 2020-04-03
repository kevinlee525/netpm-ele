import Vue from 'vue'
import VueRouter from 'vue-router'

import NetDevice from 'views/netdevice/NetDevice'
import DashBoard from 'views/dashboard/DashBoard'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/dashboard',
  },
  {
    path:'/dashboard',
    name:'dashboard',
    component:DashBoard
  },
  {
    path: '/netdevice',
    name: 'netdevice',
    component:NetDevice
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
