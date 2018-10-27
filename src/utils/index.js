/**
 * 是否身份证号
 * @param  {[isCard]} string [字符串]
 * @return {[boolean]}        [boolean]
 */
export const isCard = (idCard) => {
  // 15位和18位身份证号码的正则表达式
  var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
  //  如果通过该验证，说明身份证格式正确，但准确性还需计算
  if (regIdCard.test(idCard)) {
    if (idCard.length === 18) {
      var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 将前17位加权因子保存在数组里
      var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2] // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
      var idCardWiSum = 0 // 用来保存前17位各自乖以加权因子后的总和
      for (var i = 0; i < 17; i++) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i]
      }
      var idCardMod = idCardWiSum % 11// 计算出校验码所在数组的位置
      var idCardLast = idCard.substring(17)//  得到最后一位身份证号码
      //  如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod === 2) {
        if (idCardLast === 'X' || idCardLast === 'x') {
          return true
          //  alert("恭喜通过验证啦！")
        } else {
          return false
          //  alert("身份证号码错误！")
        }
      } else {
        //  用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast - 0 === idCardY[idCardMod] - 0) {
          //  alert("恭喜通过验证啦！");
          return true
        } else {
          return false
          //  alert("身份证号码错误！")
        }
      }
    }
  } else {
    //  alert("身份证格式不正确!")
    return false
  }
}

/**
 * [判断是否为手机号]
 * @param  {[String|Number]} str [description]
 * @return {[Boolean]}     [Boolean]
 */
export const isPhone = (str) => {
  return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
}

/**
 * 图片压缩，默认同比例压缩
 * @param {Object} filte
 *   pc端传入的路径可以为相对路径，但是在移动端上必须传入的路径是照相图片储存的绝对路径
 * @param {Object} obj
 *   obj 对象 有 width， height， quality(0-1)
 * @param {Object} callback
 *   回调函数有一个参数，base64的字符串数据
 */
import EXIF from 'exif-js'
import MegaPixImage from '../libs/megapix-image'
export const dealImage = (file, obj, callback) => {
  if (!/image\/\w+/.test(file.type)) {
    console.error('file 格式错误')
    return
  }
  var reader = new window.FileReader()
  reader.readAsDataURL(file)
  reader.onload = function (e) {
    var img = new window.Image()
    img.onload = function () {
      var that = this
      // 默认按比例压缩
      var w = that.width
      var h = that.height
      var scale = w / h
      if (obj.width) {
        w = obj.width > w ? w : obj.width
      }
      h = obj.height || (w / scale)
      var quality = 0.7  // 默认图片质量为0.7
      // 生成canvas
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')
      // 创建属性节点
      var anw = document.createAttribute('width')
      anw.nodeValue = w
      var anh = document.createAttribute('height')
      anh.nodeValue = h
      canvas.setAttributeNode(anw)
      canvas.setAttributeNode(anh)
      ctx.drawImage(that, 0, 0, w, h)
      // 图像质量
      if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
        quality = obj.quality
      }
      var base64 = null

      if (navigator.userAgent.match(/iphone/i)) {
        var myorientation = 0
        EXIF.getData(file, function () {
          // 图片方向角
          // var Orientation = null
          // alert(EXIF.pretty(this))
          EXIF.getAllTags(this)
          // alert(EXIF.getTag(this, 'Orientation'))
          myorientation = EXIF.getTag(this, 'Orientation')
          // return;

          // alert(myorientation.toString());
          var mpImg = new MegaPixImage(img)
          mpImg.render(canvas, {
            maxWidth: w,
            maxHeight: h,
            quality: quality,
            orientation: myorientation
          })
          base64 = canvas.toDataURL('image/jpeg', quality)
          callback(base64)
        })
        // } else if (navigator.userAgent.match(/Android/i)) {
        //   // var encoder = new JPEGEncoder()
        //   callback(base64)
      } else {
        base64 = canvas.toDataURL('image/jpeg', quality)
        callback(base64)
      }
    }
    img.src = this.result
  }
}
