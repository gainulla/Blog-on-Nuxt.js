import Vue from 'vue'

Vue.mixin({
  methods: {

    pathFor(path, locale=false, slug=false) {
      locale = locale ? locale : this.$i18n.locale
      slug = slug ? `/${slug}` : ""

      if (locale == this.$i18n.defaultLocale) {
        return path + slug
      } else {
        return '/' + locale + path + slug
      }
    }

  }
})