import Vue from 'vue'
import CyrillicToTranslit from 'cyrillic-to-translit-js'

Vue.mixin({
  methods: {

    pathFor(path, locale=false, param=false) {
      locale = locale ? locale : this.$i18n.locale
      param = param ? `/${param}` : ""

      if (locale == this.$i18n.defaultLocale) {
        return path + param
      } else {
        param = CyrillicToTranslit().transform(param, '-')
        return '/' + locale + path + param
      }
    },

    featImg(name) {
      return this.imgByType(name, 'featured')
    },

    contImg(name) {
      return this.imgByType(name, 'content')
    },

    imgByType(name, type) {
      if (name == '' || name == 'default.jpg') {
        return require('~/assets/images/default.jpg')
      } else {
        if (type == 'featured') {
          return require(`~/assets/images/featured/${name}`)
        } else if (type == 'content') {
          return require(`~/assets/images/content/${name}`)
        }
      }
    }

  }
})
