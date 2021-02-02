<template>
  <div>
    <Header>
      <LocaleSwitch slot="locale-switch" :path="'/blog'" />
    </Header>

    <div class="container">
      <h1 class="headline text-center">{{ $t('headline1.blog') }}</h1>

      <ArticlesList :articles="articles" />

    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',

  async asyncData({ $content, params, app }) {
    const currentLocale = app.i18n.locale

    const articles = await $content(`${currentLocale}/blog`)
      //.only(['title', 'description', 'image', 'slug', 'tags', 'path'])
      .without(['body'])
      .sortBy('createdAt', 'desc')
      .fetch()

    return {
      articles: articles.map(article => ({
        ...article,
        path: currentLocale == app.i18n.defaultLocale
              ? article.path.replace(`/${currentLocale}`, "")
              : article.path,
      })),
      locale: app.i18n.locale
    }
  }
}
</script>

<style lang="scss" scoped>

.headline {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 2.4rem;
  font-family: var(--primary-font);
  font-weight: 700;
}

@media (min-width: 768px) {
  .headline {
    margin-bottom: 3rem;
  }
}

</style>