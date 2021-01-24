<template>
  <div>

    <ul v-if="isContentPage" class="lang-switcher">
      <li v-for="(lang, key) in languages" :key="key"
        :class="{ 'active': $i18n.locale == lang.locale }"
      >
        <nuxt-link :to="pathFor('/blog', lang.locale, lang.slug)">
          {{ lang.locale }}
        </nuxt-link>
      </li>
    </ul>

    <ul v-else class="lang-switcher">
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

ul.lang-switcher {
  line-height: 6rem;
  padding-right: 1rem;
  text-align: right;

  li {
    display: inline-block;
    background-color: white;

    &.active {
      a {
        color:hsl(206, 6%, 50%);
        font-weight: bold;
      }
    }

    a {
      font-size: .9rem;
      display: block;
      text-transform: uppercase;
      padding: .1rem .3rem;
      
      &:visited, &:active {
        color:hsl(206, 6%, 30%);
      }
    }
  }
}
</style>