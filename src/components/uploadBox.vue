<template>
  <div class="upload-box-com clearfix">
    <div class="show-imgs">
      <div class="img-item" v-for="(it, index) in imgPath" :key="index">
        <md-icon color="#00aaf7" name="circle-cross" class="close-icon" size="lg" @click.stop="removeImg(index)"></md-icon>
        <img :src="getImage(it.path)">
      </div>
    </div>
    <!-- <div class="show-imgs">

    </div> -->
    <div class="upload-img">
      <div class="inf">
        <md-icon name="hollow-plus" size="lg" color="#999"></md-icon>
        <p class="txt">{{tips}}</p>
      </div>
      <input type="file" name="file" accept="image/*" @change="chooseImg">
    </div>
  </div>
</template>

<script>
import { uploadImage } from 'api'
import { Icon, Toast } from 'mand-mobile'
// import { ImagePreview } from 'vant'
export default {
  components: {
    [Icon.name]: Icon
  },
  props: {
    module: {
      type: String,
      default: ''
    },
    max: {
      type: Number,
      default: 3
    },
    value: {
      type: String,
      default: ''
    },
    tips: {
      type: String,
      default: '上传图片'
    },
    imgPath: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    imgPath (val) {
      this.$emit('on-upload-img', val)
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    removeImg (index) {
      this.imgPath.splice(index, 1)
    },
    uploadFile (file) {
      return new Promise((resolve, reject) => {
        uploadImage({
          module: this.module,
          file
        }).then(res => {
          if (res.data.code === 200) {
            resolve(res.data.data[0])
          } else {
            reject(res.data.msg)
          }
        }).catch(res => {
          reject(res)
        })
      })
    },
    chooseImg (e) {
      if (this.max === this.imgPath.length) {
        return Toast.failed('最多只能传3张哟~~')
      }
      Toast.loading('正在上传中...')
      let files = Array.prototype.slice.call(e.target.files)
      if (!files || !files.length) return
      const file = files[0]
      this.uploadFile(file).then(path => {
        this.imgPath.push(path)
        Toast.hide()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
// @import url(../style/animation.less);
.upload-box-com {
}
.upload-box-com .show-imgs {
  float: left;
}
.upload-box-com .show-imgs .img-item {
  width: 160px;
  height: 160px;
  float: left;
  margin-right: 30px;
  margin-bottom: 30px;
  position: relative;
}
.upload-box-com .show-imgs .close-icon {
  position: absolute;
  top: -10px;
  right: -10px;
  // background: rgba(0, 0, 0, 0.6);
  // color: #fff;
}
.upload-box-com .show-imgs img {
  width: 100%;
  height: 100%;
  display: block;
}
.upload-box-com .upload-img {
  background-color: #fff;
  text-align: center;
  position: relative;
  width: 160px;
  height:160px;
  padding: 30px 15px;
  float: left;
}
.upload-box-com .upload-img .inf .txt {
  font-size: 24px;
  color: #999999;
  margin-top: 20px;
}
.upload-box-com input {
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>
