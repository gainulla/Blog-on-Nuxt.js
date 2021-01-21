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
  overflow: hidden;
  background-color: #F1F1F1;

  ul.nav-list {
    float: right;
    margin-top: .4rem;
    margin-right: 1rem;

    a {
      display: inline-block;
      padding: .8rem .8rem;
      color: hsl(150, 1%, 37%);
      text-transform: lowercase;
      letter-spacing: .05em;

      &.nuxt-link-exact-active {
        border-bottom: 2px solid hsl(150, 2%, 52%);
        font-weight: bold;
        letter-spacing: initial;
      }
    }
  }
}
</style>