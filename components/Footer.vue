<template>
  <div>
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

.wave {
  margin-bottom: -250px;
  height: 130px;
  clip-path: url(#wave);
  background-color: #D5DADD;
  z-index: -1;
}

footer {
  width: 100%;
  min-width: 320px;

  .social {
    height: 80px;
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
