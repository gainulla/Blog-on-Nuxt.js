import Vue from 'vue'

Vue.mixin({
  methods: {

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
