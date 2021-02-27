<template>
  <div class="w-min">
    <header>
      <div class="container clearfix">
        <div class="header">
          <nuxt-link :to="$urlFor('/')" class="polygon polygon--logo">
            <div class="polygon__inner">
              <img :src="require('~/assets/images/site-logo.svg')" class="logo">
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

    <div class="wave w-min" />
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
/**
---------- Logo position ---------- */

.polygon.polygon--logo {
  position: relative;
  top: 1.5rem;
  left: -5px;
}

.wave {
  margin-top: -30px;
  margin-bottom: -420px;
  height: 300px;
  clip-path: url(#wave);
  background-color: #FFF;
}

header {
  background-image: linear-gradient(#cdf3be, #70db66);
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
    color: var(--text-featured) !important;
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
    .app-search-comp {
      display: flex;
      align-items: flex-end;
      flex-grow: 1;
      width: auto;
      margin: 8.5rem auto;
      margin-left: -9.6rem;
    }
  }
}
</style>
