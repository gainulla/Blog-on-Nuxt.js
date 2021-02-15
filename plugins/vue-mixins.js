import Vue from 'vue'
import CyrillicToTranslit from 'cyrillic-to-translit-js'

Vue.mixin({
  methods: {

    pathFor (path, locale = false, param = false) {
      locale = !locale ? this.$i18n.locale : locale
      param = param ? `/${param}` : ''
      param = CyrillicToTranslit().transform(param, '-')

      if (locale === this.$i18n.defaultLocale) {
        return path + (param).replace(/\s+/g, '-')
      } else {
        return '/' + locale + path + param
      }
    },

    featImg (name) {
      return this.imgByType(name, 'featured')
    },

    contImg (name) {
      return this.imgByType(name, 'content')
    },

    imgByType (name, type) {
      if (name === '' || name === 'default.jpg') {
        return require('~/assets/images/default.jpg')
      } else {
        try {
          if (type === 'featured') {
            return require(`~/assets/images/featured/${name}`)
          }
          if (type === 'content') {
            return require(`~/assets/images/content/${name}`)
          }
        } catch (err) {
          return require('~/assets/images/default.jpg')
        }
      }
    }

  }
})
