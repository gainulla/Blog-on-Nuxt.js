<template>
  <header>

    <div class="container clearfix">

      <div class="top-info-box"></div>

      <div class="header-layer-fst">
        <a :href="pathFor('/')" class="logo">
          <img :src="require('~/assets/images/logo.png')" />
        </a>
        <ul v-if="!isContentPage" class="lang-switcher">
          <li v-for="(lang, key) in allLanguages" :key="key"
            :class="{ 'active': $i18n.locale == lang.locale }"
          >
            <nuxt-link :to="switchLocalePath(lang.locale)">
              {{ lang.locale }}
            </nuxt-link>
          </li>
        </ul>
        <ul v-else class="lang-switcher">
          <li v-for="(lang, key) in allLanguages" :key="key"
            :class="{ 'active': $i18n.locale == lang.locale }"
          >
            <nuxt-link :to="pathFor('/blog', lang.locale, lang.slug)">
              {{ lang.locale }}
            </nuxt-link>
          </li>
        </ul>
      </div>

      <Nav />

    </div>
    
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
      default: () => [
        { locale: 'en', slug: false },
        { locale: 'ru', slug: false }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.top-info-box {
  background-color: #F1F1F1;
  height: 2.7rem;
}

.header-layer-fst {
  position: relative;
  background-color: white;
  display: flex;

  .logo {
    padding: 1.3rem;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    img {
      width: 60px;
      height: 50px;
      display: block;
    }
  }
}

ul.lang-switcher {
  position: absolute;
  right: 0;
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
      color: hsl(206, 6%, 50%);
    }
  }
}
</style>