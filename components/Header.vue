<template>
  <header>
    <div class="container clearfix">
      
      <ul v-if="!isContentPage" class="lang-switcher">
        <li :class="{ 'active': $i18n.locale == 'en' }">
          <nuxt-link :to="switchLocalePath('en')">en</nuxt-link>
        </li>
        <li :class="{ 'active': $i18n.locale == 'ru' }">
          <nuxt-link :to="switchLocalePath('ru')">ru</nuxt-link>
        </li>
      </ul>
      
      <ul v-if="allLanguages.length" class="lang-switcher">
        <li v-for="(lang, key) in allLanguages" :key="key"
          :class="{ 'active': $i18n.locale == lang.locale }"
        >
          <nuxt-link :to="postOnLangRoute(lang)">
            {{ key == 1 ? '&nbsp;' : '' }}{{ lang.locale }}
          </nuxt-link>
        </li>
      </ul>

    </div>
    <Nav />
  </header>
</template>

<script>
export default {
  name: 'Header',

  computed: {
    isContentPage() {
      return this.$route.name.includes('slug')
    }
  },
  
  props: {
    allLanguages: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    postOnLangRoute(lang) {
      if (lang.locale == this.$i18n.defaultLocale) {
        return `/blog/${lang.slug}`
      } else {
        return `/${lang.locale}/blog/${lang.slug}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
ul.lang-switcher {
  text-align: right;
  padding: 1rem;

  li {
    display: inline-block;
    background-color: white;

    &.active {
      background-color: rgb(141, 188, 233);
      a {
        color: white;
      }
    }

    a {
      display: block;
      text-transform: uppercase;
      padding: .1rem .5rem;
      color: rgb(150, 186, 219);
      border: 1px solid rgb(217, 224, 230);
    }
  }
}
</style>