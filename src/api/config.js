export const API_ROOT = getHelper('API_ROOT')

export const CDN_ROOT = getHelper('CND_ROOT')

export const CookieDomain = getHelper('CookieDomain')

function getHelper (type) {
  // 获取api 的host
  if (type === 'API_ROOT') {
    if (process.env.NODE_ENV === 'production') {
      return 'http://47.106.66.151:7001/'
      // return 'http://localhost:7001/'
    } else if (process.env.NODE_ENV === 'test') {
      return 'http://localhost:7001/'
    } else {
      return 'http://localhost:7001/'
      // return 'http://car.majie.i.cacf.cn/'
      // return 'http://console.chengjiajia.i.cacf.cn'
      // return 'http://console.xujianping.i.cacf.cn'
      // return 'http://console.zhongming.i.cacf.cn'
      // return 'http://console.jiangyu.i.cacf.cn'
    }
  }

  // CND 的host
  if (type === 'CND_ROOT') {
    if (process.env.NODE_ENV === 'production') {
      return 'https://img.51kcwc.com'
    } else if (process.env.NODE_ENV === 'test') {
      return 'http://img.i.cacf.cn'
    } else {
      return 'http://img.i.cacf.cn'
    }
  }

  // cookie host
  if (type === 'CookieDomain') {
    if (process.env.NODE_ENV === 'production') {
      return 'tanwenchao.com'
    } else if (process.env.NODE_ENV === 'test') {
      return 'car.i.cacf.cn'
    } else {
      return ''
    }
  }
}
