import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    // 首页
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['../pages/home'], resolve),
      meta: { title: '首页' }
    },
    {
      path: '*',
      name: '404',
      component: resolve => require(['../pages/404'], resolve)
    }
  ]
})
