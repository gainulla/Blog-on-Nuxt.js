<template>
  <div>

    <ul v-if="isContentPage" class="lang-switch">
      <li v-for="(lang, key) in localesData" :key="key"
        :class="{ 'active': $i18n.locale == lang.locale }"
      >
        <nuxt-link v-if="path == '/blog'"
          :to="pathFor(path, lang.locale, lang.slug)"
        >{{ lang.locale }}</nuxt-link>

        <nuxt-link v-if="path == '/blog/tag'"
          :to="pathFor(path, lang.locale, $tagsArr(lang.tags)[tagPriority])"
        >{{ lang.locale }}</nuxt-link>
      </li>
    </ul>

    <ul v-else class="lang-switch">
      <li v-for="(lang, key) in localesData" :key="key"
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
import CyrillicToTranslit from 'cyrillic-to-translit-js'

export default {
  name: 'LocaleSwitch',

  props: {
    localesData: {
      type: Array,
      default: () => ([
        { locale: 'en', slug: '', tags: '' },
        { locale: 'ru', slug: '', tags: '' }        
      ])
    },
    path: {
      default: () => '/'
    },
  },

  computed: {
    isContentPage() {
      return (
        this.$route.name.includes('slug') ||
        this.$route.name.includes('tag')
      )
    },
    tagPriority() {
      let arrKey = 0
      const tagsArr = this.$tagsArr(this.localesData)
      tagsArr.forEach((tag, i) => {
        const tagDec = decodeURI(this.$route.params.tag).trim()
        if (CyrillicToTranslit().transform(tag, '-') == tagDec) {
          arrKey = i
        }
      })
      return arrKey;
    }
  }
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