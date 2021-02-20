<template>
  <div>
    <Header>
      <LocaleSwitch
        slot="locale-switch"
        :page-route="'/blog'"
        :locales-data="article.localesData"
      />
    </Header>

    <div class="container">
      <div v-if="hostname == 'http://localhost:300'" class="admin-area">
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
            ref="feat-image"
            :srcset="`
              ${featImg(article.image)} 1024w,
              ${featImg($appendImgSize(article.image, '_small'))} 600w,
              ${featImg($appendImgSize(article.image, '_thumb'))} 320w
            `"
            :alt="article.alt"
            class="featured"
          >
          <h1 class="title">
            {{ article.title }}
          </h1>
          <p class="description">
            {{ article.description }}
          </p>
          <small>{{ $t('published') }}: {{ formatDate(article.published) }}</small>
          <nuxt-content :document="article" class="content clearfix mb-1" />
        </article>
      </div>

      <PrevNext :prev="prev" :next="next" class="mb-2" />
    </div>

    <Footer />
  </div>
</template>

<script>
import Prism from '~/plugins/prism'
import conf from '~/utils/conf'

export default {
  name: 'Article',

  async asyncData (context) {
    const { $content, params, app } = context
    const article = await $content(`${app.i18n.locale}/blog`, params.slug)
      .fetch()

    const [prev, next] = await $content(`${app.i18n.locale}/blog`)
      .only(['title', 'slug', 'image'])
      .sortBy('published', 'asc')
      .surround(article.slug)
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

  data () {
    return {
      hostname: process.env.baseUrl,
      featImage: ''
    }
  },

  head () {
    return {
      title: this.article.title,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        ...this.meta,
        {
          property: 'article:published_time',
          content: this.article.createdAt
        },
        {
          property: 'article:modified_time',
          content: this.article.updatedAt
        },
        {
          property: 'article:tag',
          content: this.$tagsArr(this.article.localesData).join(', ')
        },
        { name: 'twitter:label1', content: 'Written by' },
        { name: 'twitter:data1', content: conf.author || '' },
        { name: 'twitter:label2', content: 'Filed under' },
        {
          name: 'twitter:data2',
          content: this.$tagsArr(this.article.localesData).join(', ')
        }
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: this.$fullUrl(`/blog/${this.$route.params.slug}`)
        }
      ]
    }
  },

  computed: {
    meta () {
      return this.$seoMeta({
        type: 'article',
        title: this.article.title,
        description: this.article.description,
        url: `${process.env.baseUrl}/blog/${this.$route.params.slug}`
      })
    }
  },

  mounted () {
    Prism.highlightAll()
  },

  methods: {
    formatDate (date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
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
  margin-top: 1rem;
  margin-bottom: -3rem;

  a.btn {
    text-transform: uppercase;
    margin-left: .2rem;
    background-color: darken(#b0c4c0, 20);
    color: white;
    padding: .5rem .8rem;

    &:first-of-type {
      margin-left: auto;
    }
  }
}

.page-content {
  padding-top: 2.5rem;

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
    margin-top: 1.2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 3rem;
    background-color: #FAFAFA;
  }
}

@media (min-width: 992px) {
  .page-content {
    padding-left: 4rem;
    padding-right: 4rem;
    padding-bottom: 1rem;

    article img.featured {
      max-width: 100%;
    }
  }
}
</style>
