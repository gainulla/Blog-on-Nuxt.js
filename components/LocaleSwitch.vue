<template>
  <div>
    <ul
      v-if="isContentPage || isTagPage || isAdminPage"
      class="lang-switch"
    >
      <li
        v-for="(lang, key) in localesData"
        :key="key"
        :class="{
          'active': $i18n.locale == lang.locale,
          'default': lang.locale == $i18n.defaultLocale
        }"
      >
        <nuxt-link
          v-if="pageRoute == '/blog' || pageRoute == '/admin/blog'"
          :to="$urlFor(`${pageRoute}/${lang.slug}`, lang.locale)"
        >
          {{ lang.locale }}
        </nuxt-link>

        <nuxt-link
          v-if="pageRoute == '/blog/tag'"
          :to="$urlFor(`${pageRoute}/${$tagsArr(lang.tags)[tagPriority]}`, lang.locale)"
        >
          {{ lang.locale }}
        </nuxt-link>
      </li>
    </ul>

    <ul v-else class="lang-switch">
      <li
        v-for="(lang, key) in localesData"
        :key="key"
        :class="{
          'active': $i18n.locale == lang.locale,
          'default': lang.locale == $i18n.defaultLocale
        }"
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
        { locale: 'ru', slug: '', tags: '' },
        { locale: 'en', slug: '', tags: '' }
      ])
    },

    pageRoute: {
      type: String,
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

    isAdminPage () {
      return this.$route.name.includes('admin')
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
  width: 100%;
  display: flex;
  justify-content: center;

  li {
    display: inline-block;
    border: 1px solid #fff;
    border-right: none;
    &:last-child {
      border-right: 1px solid #fff;
    }

    a {
      font-family: var(--primary-font);
      font-weight: 400;
      display: block;
      text-transform: uppercase;
      padding: .6rem .8rem;
      color: darken(#b0c4c0, 10);
      transition: opacity 200ms ease;
    }

    &.active {
      a {
        color: darken(#b0c4c0, 30) !important;
        text-decoration: underline;
      }
    }

    order: 1;

    &.default {
      order: -1;
    }
  }
}
</style>
