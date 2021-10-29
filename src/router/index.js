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
import Trend from 'views/power/Trend'
import Pie from 'views/power/Pie'
import Budget from 'views/budget/Budget'
import BudegetDetail from 'views/budget/BudgetDetail'
import Resource from 'views/resource/Resource'
import ResourceDetail from 'views/resource/ResourceDetail'
Vue.use(VueRouter);

const routes = [{
    path: '/',
    // redirect:'/dashboard',
    redirect: '/arp/',
  },
  {
    path: '/dashboard/',
    name: 'dashboard',
    component: DashBoard
  },
  {
    path: '/arp/',
    name: 'arp',
    component: Arp
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/acl/',
    name: 'acl',
    component: Acl,
  },
  {
    path: '/netdevice/',
    // redirect:'/dashboard/',
    name: 'netdevice',
    component: NetDevice,
  },
  {
    path: '/trend/',
    name: 'trend',
    component: Trend,
    // beforeEnter:(to,from,next) => {
    // if (document.cookie.match('ldap')){
    // next()
    // }
    // else{
    // window.open('https://sso.yunshanmeicai.com/index.php/user/login',"_self")
    // }
    // console.log(to)
    // console.log(from)
    // next('https://sso.yunshanmeicai.com/index.php/user/login')
    // }
  },
  {
    path: '/pie/',
    name: 'pie',
    component: Pie
  },
  {
    path: '/budget/',
    name: 'budget',
    component: Budget
  },
  {
    path: '/budget/:tier1/:month/',
    name: 'budgetdetail',
    component: BudegetDetail
  },
  {
    path: '/resource/:tier1',
    name: 'resource',
    component: Resource
  },
  {
    path: '/resource/:tier1/:tier2/',
    name: 'resourcedetail',
    component: ResourceDetail
  },
  // {
  //   path:'/budget/:tier2/:tier3'
  // 子路由通过 this.$route.params.num 的形式来获取父路由向子路由传递过来的参数
  // }
];

const router = new VueRouter({
  routes
});

export default router