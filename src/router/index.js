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
import TestAcl from 'views/acl/TestAcl'
import PopAcl from 'views/acl/PopAcl'
import StageAcl from 'views/acl/StageAcl'
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
    path:'/acl/test/',
    name:'test',
    component:TestAcl,
  },
  {
    path:'/acl/stage/',
    name:'stage',
    component:StageAcl
  },
  {
    path:'/acl/pop/',
    name:'pop',
    component:PopAcl
  }
];

const router = new VueRouter({
  routes
});

export default router
