<template>
  <nav class="app-nav">
    <div class="container">
      <nuxt-link to="/" class="logo">Nuxt Blog</nuxt-link>
      <ul class="nav-list">
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/blog">Blog</nuxt-link>
        <!-- <a href="/admin/blog/edit/new">New Post</a> -->
        <nuxt-link to="/about">About</nuxt-link>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.logo {
  color: white;
  font-size: 1.6rem;
  line-height: 2;
  padding: 0;
  margin-left: 1rem;
}

nav {
  overflow: hidden;
  //background-color: hsla(14, 38%, 43%, 0.801);
  background-color: hsla(147, 43%, 55%, 0.801);

  ul.nav-list {
    float: right;
    margin-top: .4rem;
    margin-right: 1rem;

    a {
      display: inline-block;
      padding: .5rem .8rem;
      margin-bottom: .4rem;
      color: white;
      //background-color: hsla(14, 32%, 49%, 0.801);
      background-color: hsla(147, 43%, 55%, 0.801);
      &.nuxt-link-exact-active {
        //background-color: hsla(14, 73%, 55%, 0.801);
        background-color: hsla(147, 77%, 51%, 0.801);
      }
    }
  }
}
</style>