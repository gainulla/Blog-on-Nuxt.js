<template>
  <div class="footer-wrapper">
    <div class="wave" />
    <svg>
      <clipPath id="wave" clipPathUnits="objectBoundingBox">
        <path class="st0" d="M1,0c0,0-0.1,0.1-0.3,0.1S0.3,0,0,0.1V1h1L1,0z" />
      </clipPath>
    </svg>

    <footer class="border-b border-b--darker">
      <div class="container">
        <div class="social">
          <a :href="`${hostname}/blog/rss-${$i18n.locale}.xml`" target="_blank">
            <span class="icon rss" />
          </a>
          <a :href="twitterUrl" target="_blank">
            <span class="icon twitter" />
          </a>
          <a :href="githubUrl" target="_blank">
            <span class="icon github" />
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import conf from '~/utils/conf'

export default {
  data () {
    return {
      hostname: process.env.baseUrl
    }
  },

  computed: {
    twitterUrl () {
      return conf.twitterURL
    },
    githubUrl () {
      return conf.githubURL
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-wrapper {
  min-width: 320px;
}

.wave {
  position: relative;
  margin-top: -280px;
  margin-bottom: -240px;
  height: 300px;
  clip-path: url(#wave);
  background-color: #FFF;
  z-index: 1;
  transform: rotate(180deg);
}

footer {
  position: relative;
  width: 100%;
  height: 180px;
  min-width: 320px;
  background-color: #83d495;

  .social {
    height: 180px;
    padding-top: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      padding: 0 1rem;
      display: inline-block;
      .icon {
        transform: scale(.8);
      }
    }
  }
}
</style>
