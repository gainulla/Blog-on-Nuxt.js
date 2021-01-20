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

  async asyncData({ $content, params, app }) {
    const article = await $content(`${app.i18n.locale}/blog`,
      { text: true }, params.slug
      ).fetch()

    return {
      data: {
        article,
        content: article.text,
      }
    }
  }
}
</script>
