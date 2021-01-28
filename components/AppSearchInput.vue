<template>
  <div class="search-wrapper">
    
    <input
      v-model="searchQuery"
      type="search"
      autocomplete="off"
      :placeholder="$t('searchPH')"
    >

    <span v-if="articles.length == 0" class="icon search" />
    
    <ul v-if="articles.length">
      <li v-for="article of articles" :key="article.slug">
        <NuxtLink :to="{
            name: `blog-slug___${locale}`,
            params: { slug: article.slug }
          }"
        >{{ article.title }}</NuxtLink>
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

  props: ['locale'],
  
  watch: {
    async searchQuery(searchQuery) {
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

.search-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: column;

  input {
    width: 100%;
    height: 2.5rem;
    font-size: 1.1rem;
    font-weight: 300;
    padding: .5rem .8rem;
    border: 1px solid #EEE;
    border-radius: .4rem;
    outline: none;
  }

  .icon.search {
    align-self: flex-end;
    margin-top: -34px;
    opacity: .24;
    cursor: pointer;
  }

  ul {
    width: 100%;
    padding: 1rem;
    background-color: #F2F2F2;
    li {
      padding: .2rem 0;
    }
  }
}

@media (min-width: 576px) {
  .search-wrapper {
    width: 320px;
    input {
      margin-top: 7rem;
    }
  }
}
</style>