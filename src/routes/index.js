import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home'
import Login from '../components/Auth/Login'
import Reg from '../components/Auth/Registration'
import AdList from '../components/Ads/AdList'
import NewAd from '../components/Ads/NewAd'
import Ad from '../components/Ads/Ad'
import Orders from '../components/User/Orders'

import AuthGuard from './auth-guard'

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/ad/:id',
      props: true,
      name: 'ad',
      component: Ad,
    },
    {
      path: '/list',
      name: 'list',
      component: AdList,
      beforeEnter: AuthGuard
    },
    {
      path: '/new',
      name: 'new',
      component: NewAd,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'reg',
      component: Reg
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      beforeEnter: AuthGuard
    },
  ],
  mode: 'history'
})