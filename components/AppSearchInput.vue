<template>
  <div class="search-wrapper">
    <input
      v-model="searchQuery"
      type="search"
      autocomplete="off"
      placeholder="Search Posts"
    >
    <ul v-if="articles.length">
      <li v-for="article of articles" :key="article.slug">
        <NuxtLink :to="{ name: 'posts-slug', params: { slug: article.slug } }">
          {{ article.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      articles: [],
    }
  },
  watch: {
    async searchQuery(searchQuery) {
      if (!searchQuery) {
        this.articles = []
        return
      }
      this.articles = await this.$content('posts')
        .limit(6)
        .search(searchQuery)
        .fetch()
    }
  }
}
</script>

<style lang="scss" scoped>
.search-wrapper {
  text-align: center;
  margin-bottom: 2rem;
  input {
    font-size: 1.1rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    padding: .5rem .8rem;
    border: 1px solid #EEE;
    border-radius: .4rem;
    outline: none;
    margin-bottom: 1rem;
  }
  ul {
    padding: 0;
    margin: 0;
    li {
      margin: 0;
      padding: 0;
    }
  }
}
</style>