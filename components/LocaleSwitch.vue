<template>
  <div>

    <ul
      v-if="isContentPage || isTagPage"
      class="lang-switch"
    >
      <li
        v-for="(lang, key) in localesData"
        :key="key"
        :class="{ 'active': $i18n.locale == lang.locale }"
      >
        <nuxt-link
          v-if="path == '/blog'"
          :to="pathFor(path, lang.locale, lang.slug)"
        >{{ lang.locale }}</nuxt-link>

        <nuxt-link
          v-if="path == '/blog/tag'"
          :to="pathFor(path, lang.locale, $tagsArr(lang.tags)[tagPriority])"
        >{{ lang.locale }}</nuxt-link>
      </li>
    </ul>

    <ul v-else class="lang-switch">
      <li
        v-for="(lang, key) in localesData"
        :key="key"
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
    }
  },

  computed: {
    isContentPage () {
      return this.$route.name.includes('slug')
    },

    isTagPage () {
      return this.$route.name.includes('tag')
    },

    tagPriority () {
      let arrKey = 0
      const tagsArr = this.$tagsArr(this.localesData)

      tagsArr.forEach((tag, i) => {
        if (this.$compareTags(tag, this.$route.params.tag)) {
          arrKey = i
        }
      })

      return arrKey
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
      font-family: var(--tertiary-font);
      display: block;
      text-transform: uppercase;
      padding: .6rem .7rem;
      background-color:  #f4f8f7;
      color: #9393ac;
      transition: opacity 200ms ease;

      &.nuxt-link-exact-active {
        color: #10a578;
        background-color:  #c9fcec;
      }
    }
  }
}
</style>
