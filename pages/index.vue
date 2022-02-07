<template>
  <div class="borders borders--green-hill">
    <div class="borders__inside">
      <span class="polygon polygon--logo">
        <div class="polygon__inner">
          <img :src="require('~/assets/images/site-logo.svg')" class="logo">
        </div>
      </span>
      <div class="polygon polygon--btn polygon--xs-larger">
        <div class="polygon__inner">
          <LocaleSwitch class="locale-switch-comp" />
          <nuxt-link :to="$urlFor('/blog/page/1')" class="blog-link">
            {{ $t('blog') }}
          </nuxt-link>
        </div>
      </div>
      <div class="greeting-headline">
        <h1>{{ $t('helloHeading') }}</h1>
        <p>{{ $t('metier') }}</p>
      </div>
    </div>

    <div class="borders__x borders__x--t" />
    <div class="borders__y borders__y--r" />
    <div class="borders__x borders__x--b" />
    <div class="borders__y borders__y--l" />
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
/**
---------- Polygon logo and button positions ---------- */

.polygon {
  &.polygon--logo {
    position: absolute;
    top: 10.6%;
    left: 15%;
  }
  &.polygon--btn {
    position: absolute;
    bottom: 10%;
    right: 15%;
  }
}

/*
 ---------- Borders Module ---------- */

.borders {
  $b-width: 32px;
  $b-margin: 31px;
  $b-color: #EDEDED;
  $b-normal: solid 16px $b-color;
  $b-larger: solid 18px $b-color;

  position: relative;
  min-height: 100vh;
  overflow: hidden;

  .borders__x, .borders__y {
    position: fixed;
    background-color: #fff;
  }

  .borders__x {
    height: $b-width;
    border-bottom: $b-normal;
    z-index: 2;

    &--t {
      width: calc(100% - #{ $b-margin * 2 });
      top: 0;
      left: 31px;
      border-color: darken($b-color, 5);
    }
    &--b {
      width: calc(100% - #{ $b-margin * 2 });
      bottom: 0;
      left: $b-margin;
      transform: rotate(180deg);
      transform-origin: 50% 16px;
    }

    &::before, &::after {
      content: ' ';
      display: block;
      width: calc(#{ $b-width } + 14px);
      height: calc(#{ $b-width } + 8px);
      position: absolute;
      transform: rotate(-45deg);
      background-color: #fff;
      border-bottom: $b-larger;
      clip-path: polygon(
        0 0, 100% 0,
        85% 100%, 15% 100%
      )
    }

    &::before {
      top: 9px;
      left: -26px;
    }

    &::after {
      top: 9px;
      right: -26px;
      transform: rotate(45deg);
    }
  }

  .borders__y {
    width: $b-width;
    border-left: $b-normal;
    z-index: 1;

    &--r {
      height: calc(100% - #{ $b-margin * 2 });
      top: $b-margin;
      right: 0;
    }

    &--l {
      top: $b-margin;
      height: calc(100% - #{ $b-margin } * 2);
      transform: rotate(180deg);
      transform-origin: 16px 50%;
    }
  }

  &--green-hill {
    background:
      url(~assets/images/tree-small.png) bottom left / contain no-repeat,
      linear-gradient(
        to top right,
        #41912a 5%, #7bc957 36%, #b3ec79 50%,
        #94AAA3 50.1%, #B9C5C7 75%, #D5DADD 95%,
      );
  }

  .borders__inside {
    position: relative;
    height: 100vh;
    min-height: 500px;
    padding: 0 3rem;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
}

@media (min-width: 768px) {
  .borders {
    &--green-hill {
      background:
        //url(~assets/images/rain.png),
        url(~assets/images/tree-large.png) bottom left / contain no-repeat,
        linear-gradient(
          to top right,
        #41912a 5%, #7bc957 36%, #b3ec79 50%,
        #94AAA3 50.1%, #B9C5C7 75%, #D5DADD 95%,
        );

      animation: rain .4s linear infinite;

      // &::before {
      //   content: '';
      //   position: absolute;
      //   height: 100%;
      //   width: 100%;
      //   background-color: #fff;
      //   animation: lightning 10s ease-out infinite;
      // }
    }
  }
}

.blog-link {
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
    /* color: #59d670; */
    color: #4E9E34;
  }
}

.locale-switch-comp {
  position: absolute;
  top: 12%;
  left: 50%;
  width: 100px;
  transform: translateX(-60%) rotate(-20deg);
}

.greeting-headline {
  display: inline-block;
  color: white;
  padding-top: 1rem;

  h1 {
    font-size: 2.4rem;
    font-family: var(--secondary-font);
    margin: 0;
    line-height: 2.5rem;
  }
  p {
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: .05rem;
    font-family: var(--bold-font);
    &:first-letter {
      text-transform: capitalize;
    }
  }
}

@media (min-width: 576px) {
  .greeting-headline {
    padding-top: 3rem;
    h1 {
      font-size: 2.6rem;
      line-height: 2.8rem;
    }
  }
}

@media (min-width: 768px) {
  .greeting-headline {
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

@media (min-width: 992px) {
  .greeting-headline {
    h1 {
      font-size: 4.4rem;
    }
    p {
      font-size: 1.8rem;
    }
  }
}

@keyframes rain {
  0% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 50% 0;
  }
}

@keyframes lightning {
  0%, 14.7%, 17.7% {
    opacity: 0;
  }
  15%, 18% {
    opacity: .99;
  }
  17%, 18.3%, 100%  {
    opacity: 0;
  }
}
</style>
