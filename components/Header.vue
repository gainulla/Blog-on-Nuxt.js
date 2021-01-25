<template>
  <header>
    <div class="container clearfix">
      <div class="flex-container">
    
        <div class="logo-wrap">
          <a :href="pathFor('/')" class="logo polygon">
            <img :src="require('~/assets/images/logo.png')" class="polygon-rotate" />
          </a>
        </div>

        <nuxt-link :to="pathFor('/blog')" class="to-blog">
          {{ $t('nav.blog') }}
        </nuxt-link>

        <AppSearchInput :locale="$i18n.locale" class="app-search-comp" />

        <LocaleSwitch :allLanguages="allLanguages" class="locale-switch-comp" />

      </div>
    </div>

  </header>
</template>

<script>
export default {
  name: 'Header',

  props: {
    allLanguages: {
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>

.flex-container {
  position: relative;
  height: 8.5rem;
  display: flex;
  flex-flow: row wrap;

  .to-blog {
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;

    &:hover {
      color: initial;
      text-decoration: underline;
    }
  }

  .logo-wrap {
    width: 8rem;
    height: 100%;
    padding: 8px;

    .logo {
      position: relative;
      top: 10px;
      left: 15px;
    }
  }

  .app-search-comp {
    padding: 0 15px;
    display: flex;
    align-items: flex-end;
  }

  .locale-switch-comp {
    position: absolute;
    top: 15px;
    right: 15px;
  }

}

@media (min-width: 576px) {
  .flex-container {
    height: 10.5rem;

    .logo-wrap {
      width: 10rem;
    }

    .app-search-comp {
      display: flex;
      align-items: flex-end;
      flex-grow: 1;
      max-width: 400px;
      margin: 0 auto;
    }
  }
}

@media (min-width: 768px) {
  .flex-container {
    .locale-switch-comp {
      position: relative;
      width: 10rem;
    }
  }
}
</style>