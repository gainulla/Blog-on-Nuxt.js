<template>
  <div>
    <Header />

    <div class="container">
      <h1 class="headline text-center">{{ $t('headline1.blog') }}</h1>

      <div v-if="articles" class="articles">
        <article v-for="(article, i) in articles" :key="i">
          <nuxt-link :to="article.path">
            <div class="row">
              <div class="column col-md-5 col-lg-4">
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

      <div v-else class="articles">
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

.headline {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 2.4rem;
  font-family: var(--primary-font);
  font-weight: 700;
}

.articles {
  padding-bottom: 2rem;

  article {
    background-color: white;
    border-radius: .4rem;
    margin-bottom: .5rem;
    font-size: 1.2rem;

    a {
      img {
        display: block;
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
          font-family: var(--secondary-font);
        }

        .description {
          font-family: var(--secondary-font);

          &:last-child::after {
            content: '...';
            display: inline-block;
          }
        }
      }
    }
  }
}

@media (min-width: 576px) {
  .articles {
    padding-left: 1rem;
    padding-right: 1rem;

    article {
      a {
        img {
          min-height: 320px;
          max-height: 320px;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .headline {
    margin-bottom: 3rem;
  }

  .articles {
    article {
      margin-bottom: 2rem;
      a {
        img {
          border-top-left-radius: .4rem;
          border-bottom-left-radius: .4rem;
          min-height: 250px;
          max-height: 250px;
        }
        .details {
          padding: 25px;
          height: 100%;
          border: 1px solid #EEE;
          border-top-right-radius: .4rem;
          border-bottom-right-radius: .4rem;
        }
      }
    }
  }
}

</style>