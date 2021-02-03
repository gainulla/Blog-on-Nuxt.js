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
    }

  }
})
