<template>
  <div>
    <Header />
    <div class="container content-wrapper">

      <h1 class="text-center mt-3 mb-3">{{ $t('headline1.blog') }}</h1>

      <div v-if="articles" class="articles">
        <article v-for="(article, i) in articles" :key="i">
          <div>
            <nuxt-link :to="article.path">
              <img :src="require(`~/assets/images/featured/${article.image}`)" />
              <div class="details">
                <h2>{{ article.title }}</h2>
                <p>{{ article.description }}</p>
              </div>
            </nuxt-link>
          </div>
        </article>
      </div>
      <div v-else class="message">
        <h3 class="text-center mt-2">No posts yet.</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',

  async asyncData({ $content, params, app }) {
    const currentLocale = app.i18n.locale

    const articles = await $content(`${currentLocale}/blog`)
      .only(['title', 'description', 'image', 'slug', 'path'])
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

.articles {
  article > div {
    background-color: white;
    margin-bottom: 2rem;
    border: 1px solid #F0F0F0;
    border-radius: .4rem;
    overflow: auto;

    a {
      display: flex;
      color: #444;
      
      img {
        display: block;
        height: 250px;
        width: 360px;
        margin: 0 1.5rem 0 0;
        object-fit: cover;
      }

      .details {
        p {
          &:last-child::after {
            content: '...';
            display: inline-block;
          }
        }
      }
    }
  }

}
</style>