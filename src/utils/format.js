/**  
 * 格式化时间  
 *   
 * @param  {time} 时间  
 * @param  {cFormat} 格式  
 * @return {String} 字符串  
 *  
 * @example formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}') // -> 2018/01/29 00:00:00  
 */
export const formatDate = (strTime, cFormat) => {
  if (!strTime) return ''
  if (arguments.length === 0) return null
  if ((strTime + '').length === 10) {
    strTime = +strTime * 1000
  }

  let format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}', date
  if (typeof strTime === 'object') {
    date = strTime
  } else {
    date = new Date(strTime)
  }

  let formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }

  let time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    var value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}