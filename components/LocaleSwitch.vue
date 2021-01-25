<template>
  <div>

    <ul v-if="isContentPage" class="lang-switch">
      <li v-for="(lang, key) in languages" :key="key"
        :class="{ 'active': $i18n.locale == lang.locale }"
      >
        <nuxt-link :to="pathFor('/blog', lang.locale, lang.slug)">
          {{ lang.locale }}
        </nuxt-link>
      </li>
    </ul>

    <ul v-else class="lang-switch">
      <li v-for="(lang, key) in languages" :key="key"
        :class="{ 'active': $i18n.locale == lang.locale }"
      >
        <nuxt-link :to="switchLocalePath(lang.locale)">
          {{ lang.locale }}
        </nuxt-link>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'LocaleSwitch',

  computed: {
    isContentPage() {
      return this.$route.name.includes('slug')
    },
    languages() {
      if (this.allLanguages == null) {
        return [
          { locale: 'en', slug: false },
          { locale: 'ru', slug: false }
        ]
      } else {
        return this.allLanguages
      }
    }
  },

  props: ['allLanguages']
}
</script>

<style lang="scss" scoped>

ul.lang-switch {
  text-align: right;

  li {
    display: inline-block;
    background-color: white;

    a {
      font-size: .9rem;
      display: block;
      text-transform: uppercase;
      padding: .1rem .3rem;
      padding-top: .12rem;

      &.nuxt-link-exact-active {
        background-color: rgb(189, 218, 189);
      }
    }
  }
}
</style>