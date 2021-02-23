<template>
  <div class="screen">
    <div class="rain">
      <div class="hero">
        <span class="logo polygon">
          <div class="polygon-inner">
            <img :src="require('~/assets/images/site-logo.svg')">
          </div>
        </span>

        <div class="button polygon polygon-more border-green">
          <div class="polygon-inner">
            <LocaleSwitch class="locale-switch-comp" />
            <nuxt-link :to="$urlFor('/blog/page/1')" class="link">
              {{ $t('blog') }}
            </nuxt-link>
          </div>
        </div>

        <div class="text">
          <h1>{{ $t('helloHeading') }}</h1>
          <p>{{ $t('metier') }}</p>
        </div>
      </div>
    </div>

    <span class="border t odd" />
    <span class="border r even" />
    <span class="border b odd" />
    <span class="border l even" />
  </div>
</template>

<script>
export default {
  name: 'Home',

  head () {
    return {
      title: this.$i18n.t('seoMeta.homeTitle'),
      meta: [
        ...this.meta
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: this.$fullUrl('/')
        }
      ]
    }
  },

  computed: {
    meta () {
      return this.$seoMeta({
        type: 'page',
        title: this.$i18n.t('seoMeta.homeTitle'),
        description: this.$i18n.t('seoMeta.homeDesc'),
        url: this.$fullUrl('/')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.screen {
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  $south: #3D184E;
  $north: #1B3865;

  .rain {
    position: absolute;
    width: 100%;
    height: 100vh;
    background: url(~assets/images/rain.png), linear-gradient(
      to top left, #78E08B 10%,#78E08B  30%, #D0E1CA 50%,
       #D5DADD 50.1%, #B9C5C7 60%, 80%,#94AAA3
    );
    animation: rain .4s linear infinite;
    &::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: #fff;
      animation: lightning 10s ease-out infinite;
      opacity: 0;
    }
  }

  .hero {
    position: relative;
    height: 100vh;
    padding: 0 3rem;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    .button {
      transform: scale(1.1);
      position: absolute;
      bottom: 10%;
      right: 15%;
      transform: rotate(20deg);

      a.link {
        display: block;
        position: absolute;
        top: 50%;
        left: 55%;
        transform: translateX(-50%) rotate(-20deg);
        color: #81958f;
        font-size: 1.6rem;
        font-weight: 500;
        margin-bottom: -20px;
        &:hover {
          color: #59d670;
        }
      }

      .locale-switch-comp {
        position: absolute;
        top: 12%;
        left: 50%;
        width: 100px;
        transform: translateX(-60%) rotate(-20deg);
      }
    }

    .text {
      display: inline-block;
      color: var(--text-featured);
      padding-top: 1rem;

      h1 {
        font-size: 2.2rem;
        font-family: var(--secondary-font);
        margin: 0;
        line-height: 2.5rem;
      }
      p {
        font-size: 1rem;
        letter-spacing: .05rem;
        font-family: var(--bold-font);
        &:first-letter {
          text-transform: capitalize;
        }
      }
    }
  }

  .border {
    position: fixed;
    display: block;
    background-color: white;
    height: 32px;

    &.t {
      left: 32px;
      width: calc(100vw - 64px);
    }

    &.r {
      right: calc(-100vh + 64px);
      width: calc(100vh - 64px);
      transform-origin: 0 0;
      transform: rotate(90deg);
      margin-top: 32px;
    }

    &.b {
      bottom: 0;
      margin-left: 32px;
      width: calc(100vw - 64px);
      transform: rotate(180deg);
    }

    &.l {
      bottom: 0;
      width: calc(100vh - 64px);
      transform-origin: 0 0;
      transform: rotate(-90deg);
    }

    &::before {
      position: absolute;
      content: "";
      width: 22px;
      height: 22px;
      margin-left: -12px;
      margin-top: 20px;
      transform: rotate(45deg);
    }

    &::after {
      content: "";
      position: absolute;
      width: 18px;
      height: 60px;
      margin-left: -23px;
      margin-top: -12px;
      transform: rotate(45deg);
      background-color: white;
    }

    &.odd {
      border-bottom: solid 16px #DDD;
      &::before {
        background-color: #EDEDED;
      }
    }

    &.even {
      border-bottom: solid 16px #EDEDED;
      &::before {
        background-color: #DDD;
      }
    }
  }
}

@media (min-width: 768px) {
  .screen .hero {
    .text {
      padding-top: 3.5rem;
      h1 {
        font-size: 3.4rem;
        line-height: 3rem;
      }
      p {
        font-size: 1.4rem;
      }
    }
  }
}

@media (min-width: 992px) {
  .screen .hero {
    .text {
      h1 {
        font-size: 4.4rem;
      }
      p {
        font-size: 1.8rem;
      }
    }
  }
}

@keyframes rain {
  0% {
    background-position: 0 100%;
  }
}

@keyframes lightning {
  0%, 14.7%, 17.7%, 29% {
    opacity: 0;
  }
  15%, 18%, 30% {
    opacity: 1;
  }
  17%, 18.3%, 32%, 100%  {
    opacity: 0;
  }
}
</style>
