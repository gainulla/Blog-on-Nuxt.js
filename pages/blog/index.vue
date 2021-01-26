<template>
  <div>
    <Header />

    <div class="container">
      <h1 class="text-center mt-3 mb-3">{{ $t('headline1.blog') }}</h1>

      <div v-if="articles" class="articles">
        <article v-for="(article, i) in articles" :key="i">
          <nuxt-link :to="article.path">
            <div class="row">
              <div class="column col-5">
                <img :src="require(`~/assets/images/featured/${article.image}`)" />
              </div>
              <div class="column">
                <div class="details">
                  <h2 class="title">{{ article.title }}</h2>
                  <p class="description">{{ article.description }}</p>
                </div>
              </div>
            </div>
          </nuxt-link>
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
  article {
    background-color: white;
    padding: 1rem;
    border-radius: .4rem;

    a {
      img {
        width: 100%;
        height: 100%;
        max-height: 300px;
        margin: 0 1.5rem 0 0;
        object-fit: cover;
      }

      .details {
        text-align: left;

        .title {
          margin: 0;
        }

        .description {
          &:last-child::after {
            content: '...';
            display: inline-block;
          }
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .articles {
    article {
      a {
        img {
          border-top-left-radius: .4rem;
          border-bottom-left-radius: .4rem;
        }
        .details {
          padding: 25px;
          border: 1px solid #EEE;
          height: 100%;
          border-top-right-radius: .4rem;
          border-bottom-right-radius: .4rem;
        }
      }
    }
  }
}
</style>