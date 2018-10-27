import axios from './axios-set'
import Oaxios from 'axios'
import { dealImage } from 'utils'
import { API_ROOT } from 'api/config'

// ========================  公共接口 =========================
export const uploadImage = (data) => {
  let _d = data
  let defWidth = 640
  let form = new window.FormData()
  Object.keys(_d).forEach(key => {
    if (key !== 'file') {
      form.append(key, _d[key])
    }
  })
  // form.append('type', 'base64')
  form.append('file', _d.file)
  if (_d.file) {
    return new Promise(function (resolve, reject) {
      dealImage(_d.file, { width: defWidth }, function (base64) {
        // form.append('file', base64)
        return Oaxios.post(API_ROOT + 'uploadFile', form).then(resolve)
      })
    })
  } else {
    console.error('文件上传必须要file 的 key')
    return false
  }
}

export const postDemo = (data) => {
  return axios.post('/postDemo', { ...data })
}

export const getDemo = (params, data) => {
  return axios.get('/getDemo', { params, ...data })
}
