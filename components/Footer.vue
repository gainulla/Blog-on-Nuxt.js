<template>
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
footer {
  width: 100%;
  min-width: 320px;

  .social {
    height: 6rem;
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
