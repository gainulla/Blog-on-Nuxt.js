<template>
  <div>
    <Header>
      <LocaleSwitch
        slot="locale-switch"
        :page-route="'/blog/tag'"
        :locales-data="localesData"
      />
    </Header>

    <div class="container">
      <h1 class="headline text-center">
        {{ pageTag }}
      </h1>

      <ArticlesList :articles="articles" :locale="locale" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',

  async asyncData ({ $content, params, app, $tagsArr, $compareTags }) {
    const allArticles = await $content(`${app.i18n.locale}/blog`)
      .only(['title', 'description', 'image', 'slug', 'localesData', 'path'])
      .sortBy('createdAt', 'desc')
      .fetch()

    const tagArticles = []
    let pageTag = ''

    allArticles.forEach((article) => {
      const tagsArr = $tagsArr(article.localesData)
      tagsArr.forEach((tag) => {
        if ($compareTags(tag, params.tag)) {
          pageTag = tag
          tagArticles.push(article)
        }
      })
    })

    return {
      locale: app.i18n.locale,
      pageTag,
      localesData: tagArticles[0].localesData,
      articles: tagArticles.map(article => ({
        ...article,
        path: app.i18n.locale === app.i18n.defaultLocale
          ? article.path.replace(`/${app.i18n.locale}`, '')
          : article.path
      }))
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
