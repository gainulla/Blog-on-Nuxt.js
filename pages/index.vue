<template>
  <div class="screen">
    <span class="snow" v-for="num of 200" :key="num" />
    <span class="border t odd" />
    <span class="border r even" />
    <span class="border b odd" />
    <span class="border l even" />

    <div class="hero">

      <a :href="pathFor('/')" class="logo polygon">
        <img :src="require('~/assets/images/logo.png')" class="polygon-rotate" />
      </a>

      <div class="button polygon">
        <LocaleSwitch class="locale-switch-comp polygon-rotate" />
        <a :href="pathFor('/blog')" class="link polygon-rotate">
          {{$t('blog') }}
        </a>
      </div>

      <div class="text">
        <h1>{{ $t('headline1.home') }}</h1>
        <p>{{ $t('metier') }}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Home',
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
    to top right, $south 50%, $north 50%);
    //to top right, #1E383C 50%, #1B3865 50%);
    //to top right, #1C7ED5 50%, #C7375F 50%);
    //to top right, #AAA8B1 50%, #B49F88 50%); 
    //to top right, #9CACBF 50%,#EFD091 50%);

  // background: radial-gradient(ellipse at bottom,#1b2735 0%,#090a0f 100%);
  // filter: drop-shadow(0 0 10px white);  

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

  $octagon: polygon(
    0 28%, 28% 0,
    72% 0, 100% 28%,
    100% 72%, 72% 100%,
    28% 100%, 0 72%
  );

  .hero {
    position: relative;
    height: 100vh;
    padding: 0 3rem;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    .polygon {
      display: block;
      clip-path: $octagon;
      transform: rotate(24deg);
      min-width: 130px;
      min-height: 130px;
      background-color: white;
      background-image: linear-gradient(66deg, #F8F8F8 50%, #F2F2F2 50%);

      .polygon-rotate {
        transform: rotate(-22.5deg);
      }
    }

    .button {
      position: absolute;
      bottom: 10%;
      right: 15%;
      font-weight: bold;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
      cursor: pointer;
      a.link {
        color:  lighten($north, 10); 
        &:hover {
          color: lighten($south, 10);
        }
      }
      .locale-switch-comp {
        position: absolute;
        top: -20px;
        left: -20px;
      }
    }

    .logo {
      position: absolute;
      top: 10%;
      left: 15%;
      padding: 1rem .8rem .6rem .8rem;
      img {
        width: 110px;
        height: 100px;
      }
    }

    .text {
      display: inline-block;

      h1 {
        font-size: 2.4rem;
        font-weight: 900;
        color: #F2F2F2;
        margin: 0;
      }
      p {
        font-size: 1rem;
        letter-spacing: .05rem;
        color: white;
        &:first-letter {
          text-transform: capitalize;
        }
      }
    }
  }

  .border {
    position: fixed;
    display: block;
    background-color: white; //lime;
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

@media (min-width: 576px) {
  .screen {
    .hero {
      .text {
        h1 {
          font-size: 3.4rem;
        }
        p {
          font-size: 1.4rem;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .screen {
    .hero {
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
}
</style>