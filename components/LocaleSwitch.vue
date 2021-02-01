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
      font-weight: 500;
      display: block;
      text-transform: uppercase;
      padding: .6rem .7rem;
      color: rgb(41, 41, 42);
      transition: opacity 200ms ease;

      &.nuxt-link-exact-active {
        color: rgb(10, 6, 226);
        background-color:  rgb(233, 233, 233);
      }
    }
  }
}
</style>