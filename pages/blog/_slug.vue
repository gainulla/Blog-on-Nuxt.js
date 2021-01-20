<template>
  <div class="slug-page">
    <Header :all-languages="article.allLanguages" />

    <div class="container content-wrapper">
      <div v-show="hostname == 'localhost'" class="admin-area">
        <nuxt-link :to="editArticleRoute" class="btn"
        >Edit</nuxt-link>
        <nuxt-link :to="newArticleRoute" class="btn"
        >Add New</nuxt-link>
      </div>

      <nav class="mt-1">
        <ul>
          <li v-for="link of article.toc" :key="link.id">
            <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <article>
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <p>Article last updated: {{ formatDate(article.updatedAt) }}</p>
        <img
          :src="require(`~/assets/images/featured/${article.image}`)"
          :alt="article.alt"
          class="featured"
        >
        <nuxt-content :document="article" class="content clearfix mb-1" />
      </article>

      <PrevNext :prev="prev" :next="next" class="mb-2" />

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
.slug-page {
  h1 {
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
    line-height: 1.5;
  }

  img.featured {
    width: 500px;
    height: 300px;
    float: left;
    margin-right: 1.5rem;
    margin-bottom: .5rem;
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
</style>
