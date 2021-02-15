<template>
  <header>
    <div class="container clearfix">
      <div class="header">
        <div class="logo-wrap">
          <nuxt-link :to="pathFor('/')" class="logo polygon">
            <img :src="require('~/assets/images/site-logo.svg')">
          </nuxt-link>
        </div>

        <nuxt-link :to="pathFor('/blog')" class="to-blog featured">
          {{ $t('nav.blog') }}
        </nuxt-link>

        <AppSearchInput :locale="$i18n.locale" class="app-search-comp" />

        <div class="locale-switch-comp">
          <slot name="locale-switch" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>

.header {
  position: relative;
  height: 12rem;
  display: flex;
  flex-flow: row wrap;

  .to-blog {
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 101;
    font-size: 1.2rem;

    &:hover {
      color: initial;
      text-decoration: underline;
    }
  }

  .logo-wrap {
    width: 8rem;
    height: 8.5rem;
    padding: 8px;

    .logo {
      position: relative;
      top: 10px;
      left: 0;
    }
  }

  .app-search-comp {
    padding: 0;
    display: flex;
    align-items: flex-end;
  }

  .locale-switch-comp {
    position: absolute;
    top: 15px;
    right: 0;
  }
}

@media (min-width: 576px) {
  .header {
    .logo-wrap {
      width: 10rem;
      height: 10.5rem;
    }

    .app-search-comp {
      display: flex;
      align-items: flex-end;
      flex-grow: 1;
      width: auto;
      margin: 7.2rem auto;
      margin-left: -9.6rem;
    }
  }
}
</style>
