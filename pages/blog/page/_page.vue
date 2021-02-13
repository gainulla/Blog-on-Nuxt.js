<template>
  <div>
    <Header>
      <LocaleSwitch slot="locale-switch" :path="`/blog/page/${$route.params.page}`" />
    </Header>

    <div class="container">
      <h1 class="headline text-center">{{ $t('headline1.blog') }}</h1>

      <ArticlesList
        :articles="articles"
        :total="total"
        :per-page="perPage"
        :locale="locale"
      />

    </div>
  </div>
</template>

<script>
import getContent from '@/utils/get-content'

export default {
  name: 'Blog',

  async asyncData ({ $content, app, params, error }) {
    const perPage = 5
    const content = await getContent($content, app, params, perPage, error)

    return {
      locale: app.i18n.locale,
      total: content.allArticles.length,
      perPage,
      articles: content.paginatedArticles.map(article => ({
        ...article,
        path: app.i18n.locale === app.i18n.defaultLocale
          ? article.path.replace(`/${app.i18n.locale}`, '')
          : article.path
      }))
    }
  },

  head () {
    return {
      title: 'Blog'
    }
  }
}
</script>
