<template>
  <div>
    <Header :allLanguages="article.allLanguages" />

    <div class="page-content">
      <div class="container">

        <div v-show="hostname == 'localhost'" class="admin-area">
          <nuxt-link :to="editArticleRoute" class="btn"
          >Edit</nuxt-link>
          <nuxt-link :to="newArticleRoute" class="btn"
          >Add New</nuxt-link>
        </div>

        <article>
          <div class="row">
            <div class="column col-6">
              <img
                :src="require(`~/assets/images/featured/${article.image}`)"
                :alt="article.alt"
                class="featured"
              >
            </div>
            <div class="column article-head">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <p>Article last updated: {{ formatDate(article.updatedAt) }}</p>
            </div>
          </div>
          <nuxt-content :document="article" class="content clearfix mb-1" />
        </article>

        <PrevNext :prev="prev" :next="next" class="mb-2" />

      </div>
    </div>

  </div>
</template>

<script>
import Prism from '~/plugins/prism'

export default {
  name: 'Article',

  mounted() {
    Prism.highlightAll()
  },

  data() {
    return { hostname: "" }
  },

  created() {
    if (process.client) {
      this.hostname = window.location.hostname
    }
  },

  async asyncData(context) {
    const { $content, params, app, route, redirect } = context
    const article = await $content(`${app.i18n.locale}/blog`, params.slug)
                            .fetch()

    const [prev, next] = await $content(`${app.i18n.locale}/blog`)
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return { 
      article,
      slug: params.slug,
      prev, next,
      editArticleRoute: {
        name: `admin-blog-slug___${ app.i18n.locale }`,
        params: { slug: params.slug }
      },
      newArticleRoute: {
        name: `admin-blog-new___${ app.i18n.locale }`,
      }
    }
  },

  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  },

  head() {
    return {
      title: this.article.title,
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
      meta: [
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.article.description,
        },
        {
          property: 'og:title',
          hid: 'og:title',
          content: this.article.title,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.article.media,
        },
      ],
    };
  }
}
</script>

<style lang="scss">

.page-content {
  padding-bottom: 3rem;

  .admin-area {
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid #e9e9e6;
    padding-bottom: .5rem;
    display: flex;
    justify-content: flex-end;

    .btn {
      text-transform: uppercase;
      margin-left: .2rem;
      background-color: rgb(103, 126, 182);
      color: white;
      padding: .5rem .8rem;
    }
  }

  article {
    font-size: 1.2rem;
    font-family: var(--primary-font);

    .article-head {
      text-align: left !important;
    }

    h1 {
      font-family: var(--secondary-font);
      margin-top: 0;
    }

    .nuxt-content h2 {
      font-weight: bold;
      font-size: 28px;
    }

    .nuxt-content h3 {
      font-weight: bold;
      font-size: 22px;
    }

    .nuxt-content p {
      line-height: 1.6;
    }

    img.featured {
      width: 100%;
      max-width: 580px;
      height: auto;
      float: left;
      margin-right: 1.5rem;
      margin-bottom: 1.5rem;
      object-fit: cover;
    }

    .icon.icon-link {
      background-image: url('~assets/svg/icon-hashtag.svg');
      display: inline-block;
      width: 20px;
      height: 20px;
      background-size: 20px 20px;
    }

    .content {
      img {
        max-width: 100%;
      }
    }
  }
}

@media (min-width: 768px) {
  .page-content {
    article {
      .article-head {
        text-align: left !important;
        margin-left: 2rem;
      }
    }
  }
}

@media (min-width: 992px) {
  .slug-page {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
