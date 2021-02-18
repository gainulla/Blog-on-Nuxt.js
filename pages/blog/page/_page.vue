<template>
  <div>
    <Header>
      <LocaleSwitch
        slot="locale-switch"
        :page-route="`/blog/page/${$route.params.page}`"
      />
    </Header>

    <div class="container">
      <h1 class="headline text-center">
        {{ $t('latestPosts') }}
      </h1>

      <ArticlesList
        :articles="articles"
        :total="total"
        :per-page="perPage"
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
      title: this.$i18n.t('seoMeta.blogTitle'),
      meta: [
        ...(this.$seoMeta())
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: this.$fullUrl(`/blog/page/${this.$route.params.page}`)
        }
      ]
    }
  }
}
</script>
