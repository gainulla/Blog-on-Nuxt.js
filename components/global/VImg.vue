<template>
  <img
    :srcset="`
      ${contImg(src)} 1024w,
      ${contImg($appendImgSize(src, '_small'))} 600w,
      ${contImg($appendImgSize(src, '_thumb'))} 320w
    `"
    :alt="alt"
  />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  },

  methods: {
    imgSrc () {
      try {
        return require(`~/assets/images/content/${this.src}`)
      } catch (error) {
        return null
      }
    }
  }
}
</script>
