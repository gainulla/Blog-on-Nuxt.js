<template>
  <div class="search">
    <div class="search-inner">

      <input
        v-model="searchQuery"
        type="search"
        autocomplete="off"
        :placeholder="$t('searchPH')"
      >

      <span v-if="articles.length == 0" class="icon search" />

      <ul v-if="articles.length > 0">
        <li v-for="article of articles" :key="article.slug">
          <NuxtLink
            :to="{
              name: `blog-slug___${locale}`,
              params: { slug: article.slug }
            }"
          >{{ article.title }}</NuxtLink>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchQuery: '',
      articles: []
    }
  },

  props: ['locale'],

  watch: {
    async searchQuery (searchQuery) {
      if (!searchQuery) {
        this.articles = []
        return
      }
      this.articles = await this.$content(`${this.locale}/blog`)
        .limit(6)
        .search(searchQuery)
        .fetch()
    }
  }
}
</script>

<style lang="scss" scoped>

$search-height: 2.4rem;

.search {
  width: 100%;
  height: $search-height;

  .search-inner {
    position: relative;
    display: flex;
    flex-flow: row wrap;
    width: 260px;
    height: $search-height;
    margin: 0 auto;

    input {
      width: 100%;
      font-size: 1.1rem;
      font-weight: 300;
      padding: .46rem .8rem;
      border: 1px solid #EEE;
      border-radius: 1.2rem;
      outline: none;
    }

    .icon.search {
      position: absolute;
      top: 4px;
      right: 0;
      align-self: flex-end;
      width: 34px;
      opacity: .24;
      cursor: pointer;
    }

    ul {
      width: 100%;
      padding: 1rem;
      background-color: #F2F2F2;
      z-index: 401;
      li {
        padding: .2rem 0;
      }
    }
  }
}

@media (min-width: 768px) {
  .search .search-inner {
    min-width: 320px;
  }
}
</style>
