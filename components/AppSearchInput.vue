<template>
  <div class="search">
    <div class="search__inner">
      <input
        v-model="searchQuery"
        type="search"
        autocomplete="off"
        :placeholder="$t('searchPH')"
      >

      <span v-if="articles.length == 0" class="icon icon__search" />

      <ul v-if="articles.length > 0">
        <li v-for="article of articles" :key="article.slug">
          <NuxtLink
            :to="{
              name: `blog-slug___${$i18n.locale}`,
              params: { slug: $cyrtt(article.slug) }
            }"
          >
            {{ article.title }}
          </NuxtLink>
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

  watch: {
    async searchQuery (searchQuery) {
      if (!searchQuery) {
        this.articles = []
        return
      }
      this.articles = await this.$content(`${this.$i18n.locale}/blog`)
        .limit(6)
        .search(searchQuery)
        .fetch()
    }
  }
}
</script>

<style lang="scss" scoped>

.icon.icon__search {
  position: absolute;
  top: 5px;
  right: 0;
  align-self: flex-end;
  width: 34px;
  opacity: .14;
  cursor: pointer;
}

.search {
  $search-height: 2.4rem;

  width: 100%;
  height: $search-height;

  .search__inner {
    position: relative;
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    max-width: 320px;
    height: $search-height;
    margin: auto;

    input {
      width: 100%;
      font-size: 1.1rem;
      font-weight: 300;
      padding: .46rem .8rem;
      border: 1px solid rgba(#444, .2);
      border-radius: 1.2rem;
      outline: none;
      background-color: transparent;
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
</style>
