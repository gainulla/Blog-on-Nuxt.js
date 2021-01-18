<template>
  <div>
    <Header />
    <div class="container content-wrapper pt-0">
      <PostEditForm :data="data" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditPost',

  async asyncData({ $content, params }) {
    const article = await $content('posts', { text: true }, params.slug)
      .fetch()

    return {
      data: {
        article,
        content: article.text
      }
    }
  }
}
</script>
