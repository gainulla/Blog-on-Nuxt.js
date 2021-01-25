<template>
  <nav class="app-nav">
    <div class="container">
     
      <ul class="nav-list">
        <nuxt-link :to="pathFor('/')">{{ $t('nav.home') }}</nuxt-link>
        <nuxt-link :to="pathFor('/blog')">{{ $t('nav.blog') }}</nuxt-link>
      </ul>

    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
}
</script>

<style lang="scss" scoped>
nav {
  height: 3.5rem;
  background-color: #F1F1F1;

  ul.nav-list {
    float: right;
    margin-top: .4rem;
    margin-right: 1rem;

    a {
      display: inline-block;
      padding: .8rem .8rem;
      text-transform: lowercase;
      letter-spacing: .05em;
      font-weight: bold;

      &.nuxt-link-exact-active {
        font-weight: bold;
        letter-spacing: initial;
        margin-bottom: -5px;
        background-color: #F1F1F1;
        color: var(--link-active) !important;
      }

      &:hover {
        color: var(--link-hover) !important;
      }

      &:visited {
        color: var(--link);
      }
    }
  }
}
</style>