import Vue from 'vue'
import VueRouter from 'vue-router'

import NetDevice from 'views/netdevice/NetDevice'
import DashBoard from 'views/dashboard/DashBoard'
import Acl from 'views/acl/Acl'
import TestAcl from 'views/acl/childAcl/TestAcl'
import PopAcl from 'views/acl/childAcl/PopAcl'
import StageAcl from 'views/acl/childAcl/StageAcl'
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    // redirect:'/dashboard',
    redirect:'/acl',
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
  },
  {
    path:'/acl',
    name:'acl',
    component:Acl,
    children:[
      {
        path:'test',
        component:TestAcl
      },
      {
        path:'stage',
        component:StageAcl,
      },
      {
        path:'pop',
        component:PopAcl
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router
