import Vue from 'vue'

Vue.mixin({
  methods: {

    pathFor(path, locale=false, param=false) {
      locale = locale ? locale : this.$i18n.locale
      param = param ? `/${param}` : ""

      if (locale == this.$i18n.defaultLocale) {
        return path + param
      } else {
        return '/' + locale + path + param
      }
    }

  }
})