<template>
  <header>
    <div class="container clearfix">

      <div class="top-info-box"></div>

      <div class="header-layer-fst">
        <a :href="pathFor('/')" class="logo">
          <img :src="require('~/assets/images/logo.png')" />
        </a>
        <LocaleSwitch :allLanguages="allLanguages" />
      </div>

      <Nav />

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
</style>