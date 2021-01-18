<template>
  <div class="author-info">
    <img :src="require(`~/assets/images/unsplash/${author.pic}`)" />
    <div>
      <h4 Author></h4>
      <p>{{ author.name }}</p>
      <p>{{ author.bio }}</p>
    </div>
  </div>  
</template>

<script>
export default {
  props: {
    author: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.author-info {
  img {
    width: 300px;
  }
}
</style>