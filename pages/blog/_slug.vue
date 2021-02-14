<template>
  <div>

    <Header>
      <LocaleSwitch
        slot="locale-switch"
        :path="'/blog'"
        :localesData="article.localesData"
      />
    </Header>

    <div class="container">

      <div v-show="hostname == 'http://localhost:3000'" class="admin-area">
        <div class="row">
          <nuxt-link :to="editArticleRoute" class="btn">
            Edit
          </nuxt-link>
          <nuxt-link :to="newArticleRoute" class="btn">
            Add New
          </nuxt-link>
        </div>
      </div>

      <div class="page-content">
        <article>
          <img
            :srcset="`
              ${featImg(article.image)} 1024w,
              ${featImg($appendImgSize(article.image, '_small'))} 600w,
              ${featImg($appendImgSize(article.image, '_thumb'))} 320w
            `"
            :alt="article.alt"
            class="featured"
          >
          <h1 class="title">{{ article.title }}</h1>
          <p class="description">{{ article.description }}</p>
          <small>{{ $t('published') }}: {{ formatDate(article.published) }}</small>
          <nuxt-content :document="article" class="content clearfix mb-1" />
        </article>

      </div>

      <PrevNext :prev="prev" :next="next" class="mb-2" />
    </div>

  </div>
</template>

<script>
import Prism from '~/plugins/prism'

export default {
  name: 'Article',

  data () {
    return {
      hostname: process.env.baseUrl
    }
  },

  mounted () {
    Prism.highlightAll()
  },

  async asyncData (context) {
    const { $content, params, app } = context
    const article = await $content(
      `${app.i18n.locale}/blog`, params.slug
    ).fetch()

    const [prev, next] = await $content(`${app.i18n.locale}/blog`)
      .only(['title', 'slug', 'image'])
      .sortBy('published', 'asc')
      .surround(params.slug)
      .fetch()

    return {
      article,
      slug: params.slug,
      prev,
      next,
      editArticleRoute: {
        name: `admin-blog-slug___${app.i18n.locale}`,
        params: { slug: params.slug }
      },
      newArticleRoute: {
        name: `admin-blog-new___${app.i18n.locale}`
      }
    }
  },

  methods: {
    formatDate (date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  },

  head () {
    return {
      title: this.article.title,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        {
          property: 'og:title',
          hid: 'og:title',
          content: this.article.title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.article.description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: process.env.baseUrl + '/' + this.article.image
        }
      ]
    }
  }
}
</script>

<style lang="scss">

@media (min-width: 768px) {
  .row .column {
    &._md-64 {
      flex: 6.4;
    }
    &._md-36 {
      flex: 3.6;

      &:nth-child(2) {
        text-align: left !important;
        margin-left: 1.5rem;
      }
    }
  }
}

.admin-area {
  width: 100%;
  background-color:#c2dbd6;

  a.btn {
    text-transform: uppercase;
    margin-left: .2rem;
    background-color: darken(#b0c4c0, 10);
    color: white;
    padding: .5rem .8rem;

    &:first-of-type {
      margin-left: auto;
    }
  }
}

.page-content {
  margin-top: 2rem;
  padding-top: 2rem;

  article {
    font-size: 1.2rem;
    font-family: var(--primary-font);

    .article-head {
      text-align: left !important;
    }

    .title {
      font-family: var(--tertiary-font);
      margin-top: 0;
      color: #444;
    }

    .description {
      font-family: var(--tertiary-font);
      color: #444;
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
      display: block;
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      margin-bottom: 1.5rem;
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
        margin-top: 1.7rem;
        margin-bottom: 1.5rem;
      }
    }
  }
}

@media (min-width: 768px) {
  .page-content {
    margin-top: 3rem;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 3rem;
    background-color: #FAFAFA;
  }
}

@media (min-width: 992px) {
  .page-content {
    margin-top: 4rem;
    padding-left: 4rem;
    padding-right: 4rem;
    padding-bottom: 1rem;

    article img.featured {
      max-width: 100%;
    }
  }
}
</style>
