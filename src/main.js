// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import config from '../config'
import YDUI from 'vue-ydui'
import vueg from 'vueg'
import store from './store'
import router from './router'
import VueContentPlaceholders from 'vue-content-placeholders'
import projectInfo from '../package.json'
import { API_ROOT } from 'api/config'
import 'vueg/css/transition-min.css'
import './style/global.less'
import 'vue-ydui/dist/ydui.base.css'

Vue.config.productionTip = false

// ----- 转场动画 -----
const vuegOptions = {
  duration: '0.4'
}

// ----- 全局 use -----
Vue.use(YDUI)
Vue.use(vueg, router, vuegOptions)
Vue.use(VueContentPlaceholders)
// Vue.use(YDUI)

// ----- 全局方法 -----
Vue.prototype.goto = function (path) {
  this.$router.push(path)
}

Vue.prototype.gotoReplace = function (path) {
  this.$router.replace(path)
}

Vue.prototype.getLocalImage = function (path) {
  let _env = process.env.NODE_ENV
  if (_env === 'development') {
    if (path.indexOf('/') === 0) {
      return path
    } else {
      return '/' + path
    }
  } else {
    let userAssetsPublicPath = _env === 'production' ? config.build.assetsPublicPath : config.test.assetsPublicPath
    if (path.indexOf('/') === 0) {
      return userAssetsPublicPath + path.replace(/\//, '')
    } else {
      return userAssetsPublicPath + path
    }
  }
}

Vue.prototype.getImage = function (path, width, height) {
  if (path) {
    if (path.indexOf('http://') === 0 || path.indexOf('https://') === 0) {
      return path
    }
    let param = ''
    if (width) {
      let _h = height || ''
      param = '!' + width + _h
    }
    return API_ROOT + path + param
  } else {
    return null
  }
}

Vue.prototype.devToast = function () {
  Vue.prototype.$dialog.toast({
    mes: '正在建设中...',
    timeout: 1500
  })
}

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
try {
  history.setItem('/', 0)
} catch (_) {
  Vue.prototype.$dialog.toast({
    mes: '请勿在“无痕模式” 或者 “隐私模式” 下打开',
    timeout: 1500,
    icon: 'error'
  })
}

const nextPage = (to, next) => {
  ++historyCount
  history.setItem('count', historyCount)
  to.path !== '/' && history.setItem(to.path, historyCount)
  if (to.meta.title) {
    document.title = to.meta.title || '邻水县阳光监督'
  }
  next()
}

Vue.prototype.goBack = function () {
  if (historyCount > 1) {
    this.$router.go(-1)
  } else {
    this.$router.push('/home')
  }
}

// ----- 移动端 input 输入框获取焦点后滚动到可视区域 -----
window.addEventListener('resize', () => {
  const activeElement = document.activeElement
  if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
    setTimeout(() => {
      activeElement.scrollIntoView()
    }, 100)
  }
})

// ----- 生产环境版本信息 -----
if (process.env.NODE_ENV !== 'development') {
  console.log('当前版本: %c ' + projectInfo.version, 'color: #fccc00;')
}

// ----- Fastclick引用 -----
document.addEventListener('DOMContentLoaded', function () {
  FastClick.attach(document.body)
}, false)

// ----- 路由前置钩子 -----
router.beforeEach((to, from, next) => {
  Vue.prototype.$dialog.loading.open('加载中...')
  /* 路由发生变化修改页面title */
  nextPage(to, next)
})

// ----- 路由后置钩子 -----
router.afterEach(route => {
  // console.log(route)
  setTimeout(() => {
    Vue.prototype.$dialog.loading.close()
  }, 200)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
