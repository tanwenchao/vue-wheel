import axios from 'axios'
import Qs from 'qs'
import { API_ROOT } from './config'
import Vue from 'vue'

var instance = axios.create({
  // 请求方法
  method: 'get',

  // 基础url前缀
  baseURL: API_ROOT,

  transformRequest: [function (data) {
    // data['_csrf'] = 'ZlnEZWyZ-xIJaXmAVNIc1F5rvDJQLnjCAP0I'
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    data = Qs.stringify(data)
    return data
  }],

  transformResponse: [function (data) {
    // 这里提前处理返回的数据
    return data
  }],

  // 请求头信息
  headers: {
  },

  // parameter参数
  params: {
  },

  // post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
  data: {
  },

  // 设置超时时间
  timeout: 30000,

  // 返回数据类型
  responseType: 'json' // default
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // 不知道为何 这里可能出现 undefined
  if (config.params === undefined) config.params = {}
  return config
}, function (error) {
  return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  let _res = response
  return _res
}, function (error) {
  Vue.prototype.$dialog.toast({
    mes: '服务器出现错误',
    timeout: 1500,
    icon: 'error'
  })
  return Promise.reject(error)
})

export default instance
