<template>
  <Nuxt />
</template>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

html {
  box-sizing: border-box;
  --body-bg: #FFF;

  --link: darkslategray;
  --link-visited: palevioletred;
  --link-hover: cadetblue;
  --link-active: darkcyan;
  --primary-font: 'Nunito', sans-serif;
  --secondary-font: 'Ubuntu Mono', monospace;
  --tertiary-font: 'Marmelad', sans-serif;
  --text-featured: #{ darken(#94AAA3, 30) };
}

*, *::before, *::after {
  box-sizing: inherit;
}

body {
  margin: 0;
  font-family: var(--primary-font);
  font-weight: 300;
  background-color: var(--body-bg);
  line-height: 1.5;
}

a {
  font-family: var(--primary-font);
  transition: color 200ms ease-out;

  &:link {
    text-decoration: none;
    color: var(--link);
  }
  &:visited {
    color: var(--link-visted); //palevioletred;
  }
  &:hover {
    color: var(--link-hover);
  }
  &:active {
    color: var(--link-active);
  }

  &.featured {
    text-transform: uppercase;
    font-family: var(--tertiary-font);
  }
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

h1, h2, h3, h4, h5 {
  font-weight: normal;
}

.headline {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 2.4rem;
  font-family: var(--primary-font);
}

/**
---------- Icon Module ---------- */

.icon {
  background-repeat: no-repeat;
  display: inline-block;
  width: 36px;
  height: 36px;
  background-size: 36px 36px;

  &.icon__hashtag {
    background-image: url('~assets/svg/icon-image.svg');
  }
  &.icon__search {
    background-image: url('~assets/svg/icon-search.svg');
  }
  &.icon__cheveron-right {
    background-image: url('~assets/svg/icon-cheveron-right.svg');
  }
  &.icon__cheveron-left {
    background-image: url('~assets/svg/icon-cheveron-left.svg');
  }
  &.icon__github {
    background-image: url('~assets/svg/icon-ext-github.svg');
  }
  &.icon__twitter {
    background-image: url('~assets/svg/icon-ext-twitter.svg');
  }
  &.icon__rss {
    background-image: url('~assets/svg/icon-ext-rss.svg');
  }
}

/**
---------- Polygon Module ---------- */

.polygon {
  $polygon-width: 110px;
  $polygon-height: 90px;
  $polygon: polygon(
    22% 4%, 24.5% 1%, 27% 0, 72% 0%, 74.5% 1%, 77% 4%,
    98% 45%, 99% 50%, 98% 55%,
    77% 96%, 74.5% 99%, 72% 100%, 27% 100%, 24.5% 99%, 22% 96%,
    2% 55%, 1% 50%, 2% 45%
  );

  display: block;
  clip-path: $polygon;
  background-color: #B6C3C5;
  width: $polygon-width;
  height: $polygon-height;

  .polygon__inner {
    position: absolute;
    width: inherit;
    height: inherit;
    transform: scale(.94);
    z-index: 999;
    background-color: #EDEDED;
    clip-path: $polygon;
    padding: 15px;
  }

  &--logo {
    transform: rotate(-12deg);
  }

  &--btn {
    transform: scale(1.1);
    transform: rotate(20deg);
    background-color: #c3dbbc;
  }

  &--xs-larger {
    width: 130px;
    height: 110px;
  }
}

@media (min-width: 992px) {
  .polygon {
    width: 150px;
    height: 130px;
  }
}

/**
---------- Site Logo ---------- */

.logo {
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
  padding: 1rem;
  transform: rotate(12deg);
}

/**
---------- Container ---------- */

.container {
  margin: 0 auto;
  max-width: 1024px;
  min-width: 320px;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  z-index: 500;
}

/*
 * ------------ Flexbox  Grid Module ------------ */

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .row__col {
    flex-basis: 100%;
  }
}

@media (min-width: 768px) {
  .row {
    .row__col {
      &.row__col-md-44 {
        flex: 4.4;
      }
      &.row__col-md-56 {
        flex: 5.6;
      }
    }
  }
}

@media (min-width: 992px) {
  .row {
    .row__col {
      &.row__col-lg-38 {
        flex: 3.8;
      }
      &.row__col-lg-62 {
        flex: 6.2;
      }
    }
  }
}

/*
 * ------------ Helper classes ------------ */

.w-min {
  min-width: 320px;
}

.clearfix {
  &::before, &::after {
    content: " ";
    display: table;
  }
  &::after {
    clear: both;
  }
}

.text-center {
  text-align: center;
}

.p-0 {
  padding: 0 !important;
}
.pt-0 {
  padding-top: 0 !important;
}

.m-0 {
  margin: 0 !important;
}
.mt-0 {
  margin-top: 0 !important;
}
.mt-1 {
  margin-top: 1rem !important;
}
.mt-2 {
  margin-top: 2rem !important;
}
.mt-3 {
  margin-top: 3rem !important;
}
.mb-1 {
  margin-bottom: 1rem !important;
}
.mb-2 {
  margin-bottom: 2rem !important;
}
.mb-3 {
  margin-bottom: 3rem !important;
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  font-family:  var(--primary-font);
  color: #A7A7A7 !important;
  font-weight: 300 !important;
  opacity: 1; /* Firefox */
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
  font-family: var(--primary-font);
  color: #A7A7A7 !important;
  font-weight: 300 !important;
}
::-ms-input-placeholder { /* Microsoft Edge */
  font-family: var(--primary-font);
  color: #A7A7A7 !important;
  font-weight: 300 !important;
}
</style>
