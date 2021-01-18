<template>
  <div>
    <Header />
    <div class="container content-wrapper">
      <AppSearchInput />

      <h1 class="text-center">Latest Posts</h1>
      <div v-if="articles" class="articles">
        <article v-for="(article, i) in articles" :key="i">
          <div>
            <nuxt-link :to="{ name: 'posts-slug', params: { slug: article.slug } }">
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
  name: 'Home',

  render() {
    return ""
  },

  async asyncData({ $content, params }) {
    const articles = await $content('posts', params.slug)
      .only(['title', 'description', 'image', 'slug'])
      .sortBy('createdAt', 'desc')
      .fetch()

    return { articles }
  }
}
</script>

<style lang="scss" scoped>
.articles {
  article > div {
    background-color: white;
    margin-bottom: 1rem;
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