<template>
  <div class="slug-page">
    <Header />
    <div class="container content-wrapper">
      <nuxt-link :to="`/admin/posts/edit/${slug}`" class="admin-btn">Edit</nuxt-link>
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
        
        <Author v-if="article.author"
          :author="article.author"
          class="clearfix mb-1"
        />

        <PrevNext :prev="prev" :next="next" class="mb-2" />
      </article>
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

  async asyncData({ $content, params }) {
    const article = await $content('posts', params.slug).fetch()

    const [prev, next] = await $content('posts')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return { article, slug: params.slug, prev, next }
  },

  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
}
</script>

<style lang="scss">
.slug-page {
  h1 {
    margin-top: 0;
  }

  .test-style {
    width: 500;
    background-color: blue;
    color: white;
    padding: 4rem;
    margin-bottom: 4rem;
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

  ul {
    list-style: none;
    padding-left: 0;
  }

  ul li a {
    text-decoration: none;
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
