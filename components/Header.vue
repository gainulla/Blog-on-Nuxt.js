<template>
  <div>
    <header class="border-b">
      <div class="container clearfix">
        <div class="header">
          <nuxt-link :to="$urlFor('/')" class="logo polygon">
            <div class="polygon-inner">
              <img :src="require('~/assets/images/site-logo.svg')">
            </div>
          </nuxt-link>

          <nuxt-link :to="$urlFor('/blog')" class="to-blog featured">
            {{ $t('blog') }}
          </nuxt-link>

          <AppSearchInput class="app-search-comp" />

          <div class="locale-switch-comp">
            <slot name="locale-switch" />
          </div>
        </div>
      </div>
    </header>

    <div class="wave" />
    <svg>
      <clipPath id="wave" clipPathUnits="objectBoundingBox">
        <path class="st0" d="M1,0c0,0-0.1,0.1-0.3,0.1S0.3,0,0,0.1V1h1L1,0z" />
      </clipPath>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
.wave {
  margin-top: -30px;
  margin-bottom: -420px;
  height: 300px;
  clip-path: url(#wave);
  background-color: #FFF;
  z-index: -1;
}

header {
  background-image: linear-gradient(to top, #83d495 20%, #cff5dc);
  .container {
    z-index: 600;
  }
}

.header {
  position: relative;
  height: 15rem;
  display: flex;
  flex-flow: row wrap;

  .to-blog {
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 101;
    font-size: 1.2rem;
    text-decoration: underline;

    &:hover {
      color: initial;
    }
  }

  .logo {
    position: relative;
    top: 1.5rem;
    left: 0;
  }

  .app-search-comp {
    padding: 0;
    display: flex;
    align-items: flex-end;
  }

  .locale-switch-comp {
    position: absolute;
    top: 1rem;
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
