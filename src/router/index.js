import Vue from 'vue'
import VueRouter from 'vue-router'
/*以下代码用于解决vue在控制台的 NavigationDuplicated 报错*/
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

import Arp from 'views/arp/Arp'
import DashBoard from 'views/dashboard/DashBoard'
import Acl from 'views/acl/Acl'
import NetDevice from 'views/netdevice/NetDevice'
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    // redirect:'/dashboard',
    redirect:'/arp/',
  },
  {
    path:'/dashboard/',
    name:'dashboard',
    component:DashBoard
  },
  {
    path: '/arp/',
    name: 'arp',
    component:Arp
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
  {
    path:'/netdevice/',
    redirect:'/dashboard/',
    // name:'netdevice',
    // component:NetDevice,
  },

];

const router = new VueRouter({
  routes
});

export default router
