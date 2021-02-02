<template>
  <div>
    <Header>
      <LocaleSwitch
        slot="locale-switch"
        :path="'/blog/tag'"
        :allLanguages="firstArticle.allLanguages"
      />
    </Header>

    <div class="container">
      <h1 class="headline text-center">
        {{ decodeURI($route.params.tag).trim() }}
      </h1>

      <ArticlesList :articles="articles" />

    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',

  async asyncData({ $content, params, app, $tagsArr }) {
    const currentLocale = app.i18n.locale

    const allArticles = await $content(`${currentLocale}/blog`)
      .only(['title', 'description', 'image', 'slug', 'allLanguages', 'path'])
      .sortBy('createdAt', 'desc')
      .fetch()

    let tagArticles = []

    allArticles.forEach(article => {
      const tagsArr = $tagsArr(article.allLanguages)
      tagsArr.forEach(tag => {
        const tagDec = decodeURI(params.tag).trim()
        if (tag == tagDec) {
          tagArticles.push(article)
        }
      })
    })

    return {
      articles: tagArticles.map(article => ({
        ...article,
        path: currentLocale == app.i18n.defaultLocale
              ? article.path.replace(`/${currentLocale}`, "")
              : article.path,
      })),

      firstArticle: tagArticles[0]
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