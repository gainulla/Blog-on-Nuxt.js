<template>
  <div class="screen">
    <span v-for="num of 200" :key="num" class="snow" />
    <span class="border t odd" />
    <span class="border r even" />
    <span class="border b odd" />
    <span class="border l even" />

    <div class="hero">
      <span class="logo polygon">
        <img :src="require('~/assets/images/site-logo.svg')">
      </span>

      <div class="button polygon">
        <LocaleSwitch class="locale-switch-comp" />
        <nuxt-link :to="$urlFor('/blog/page/1')" class="link">
          {{ $t('blog') }}
        </nuxt-link>
      </div>

      <div class="text">
        <h1>{{ $t('helloHeading') }}</h1>
        <p>{{ $t('metier') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',

  head () {
    return {
      title: this.$i18n.t('seoMeta.'),
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

  background: linear-gradient(
    to top right, #FFB629 20%, #Fcdf87 42%, #F6F9CA 50%, #E2D4C4 50.1%, #CCB9B1 58%, #C08267 80%);

  @function random_range($min, $max) {
    $rand: random();
    $random_range: $min + floor($rand * (($max - $min) + 1));
    @return $random_range;
  }

  .snow {
    $total: 200;
    position: absolute;
    width: 10px;
    height: 10px;
    background: white;
    border-radius: 50%;

    @for $i from 1 through $total {
      $random-x: random(1000000) * 0.0001vw;
      $random-offset: random_range(-100000, 100000) * 0.0001vw;
      $random-x-end: $random-x + $random-offset;
      $random-x-end-yoyo: $random-x + ($random-offset / 2);
      $random-yoyo-time: random_range(30000, 80000) / 100000;
      $random-yoyo-y: $random-yoyo-time * 100vh;
      $random-scale: random(10000) * 0.0001;
      $fall-duration: random_range(10, 30) * 2s;
      $fall-delay: random(30) * -1s;

      &:nth-child(#{$i}) {
        opacity: random(10000) * 0.0001;
        transform: translate($random-x, -10px) scale($random-scale);
        animation: fall-#{$i} $fall-duration $fall-delay linear infinite;
      }

      @keyframes fall-#{$i} {
        #{percentage($random-yoyo-time)} {
          transform: translate($random-x-end, $random-yoyo-y) scale($random-scale);
        }
        to {
          transform: translate($random-x-end-yoyo, 100vh) scale($random-scale);
        }
      }
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
      position: absolute;
      bottom: 10%;
      right: 15%;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      text-transform: capitalize;
      cursor: pointer;

      a.link {
        color:  lighten($north, 10);
        font-size: 1.6rem;
        display: block;
        margin-bottom: -30px;
        &:hover {
          color: lighten($south, 10);
        }
      }

      .locale-switch-comp {
        position: absolute;
        top: 0;
        left: 50%;
        width: 100px;
        transform: translateX(-50%);
      }
    }

    .text {
      display: inline-block;
      color: #656767;
      padding-top: 4.5rem;

      h1 {
        font-size: 2.4rem;
        font-family: var(--secondary-font);
        margin: 0;
        line-height: 3rem;
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
      width: calc(100% - 64px);
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
      width: calc(100% - 64px);
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
  .screen .hero .text {
    h1 {
      font-size: 3.4rem;
    }
    p {
      font-size: 1.4rem;
    }
  }
}

@media (min-width: 992px) {
  .screen .hero .text {
    h1 {
      font-size: 4.4rem;
    }
    p {
      font-size: 1.8rem;
    }
  }
}
</style>
