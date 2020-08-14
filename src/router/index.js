import Vue from 'vue'
import VueRouter from 'vue-router'
/*以下代码用于解决vue在控制台的 NavigationDuplicated 报错*/
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

import NetDevice from 'views/netdevice/NetDevice'
import DashBoard from 'views/dashboard/DashBoard'
import Acl from 'views/acl/Acl'
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    // redirect:'/dashboard',
    redirect:'/netdevice/',
  },
  {
    path:'/dashboard/',
    name:'dashboard',
    component:DashBoard
  },
  {
    path: '/netdevice/',
    name: 'netdevice',
    component:NetDevice
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/acl/',
    name:'acl',
    component:Acl,
  },
];

const router = new VueRouter({
  routes
});

export default router
