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
  --text-featured: #{ darken(#94AAA3, 20) };
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

span.icon {
  background-repeat: no-repeat;
  display: inline-block;
  width: 36px;
  height: 36px;
  background-size: 36px 36px;

  &.hashtag {
    background-image: url('~assets/svg/icon-image.svg');
  }
  &.arrow-left {
    background-image: url('~assets/svg/icon-arrow-left.svg');
  }
  &.arrow-right {
    background-image: url('~assets/svg/icon-arrow-right.svg');
  }
  &.search {
    background-image: url('~assets/svg/icon-search.svg');
  }
  &.cheveron-right {
    background-image: url('~assets/svg/icon-cheveron-right.svg');
  }
  &.cheveron-left {
    background-image: url('~assets/svg/icon-cheveron-left.svg');
  }
  &.github {
    background-image: url('~assets/svg/icon-ext-github.svg');
  }
  &.twitter {
    background-image: url('~assets/svg/icon-ext-twitter.svg');
  }
  &.rss {
    background-image: url('~assets/svg/icon-ext-rss.svg');
  }
}

$polygon-width: 110px;
$polygon-height: 90px;

.polygon {
  display: block;
  clip-path: polygon(
    22% 4%, 24.5% 1%, 27% 0, 72% 0%, 74.5% 1%, 77% 4%,
    98% 45%, 99% 50%, 98% 55%,
    77% 96%, 74.5% 99%, 72% 100%, 27% 100%, 24.5% 99%, 22% 96%,
    2% 55%, 1% 50%, 2% 45%
  );
  background-color: #94AAA3;
  width: $polygon-width;
  height: $polygon-height;

  .polygon-inner {
    position: absolute;
    width: $polygon-width;
    height: $polygon-height;
    transform: scale(.94);
    z-index: 999;
    background-color: #EDEDED;
    clip-path: polygon(
      22% 4%, 24.5% 1%, 27% 0, 72% 0%, 74.5% 1%, 77% 4%,
      98% 45%, 99% 50%, 98% 55%,
      77% 96%, 74.5% 99%, 72% 100%, 27% 100%, 24.5% 99%, 22% 96%,
      2% 55%, 1% 50%, 2% 45%
    );
    padding: 15px;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: $polygon-width;
      height: $polygon-height;
      padding: 1rem;
    }
  }
}

@media (min-width: 992px) {
  .polygon,
  .polygon .polygon-inner,
  .polygon .polygon-inner img {
    width: 150px;
    height: 130px;
  }
}

.logo {
  position: absolute;
  top: 10.6%;
  left: 15%;
  transform: rotate(-12deg);
  img {
    transform: rotate(12deg);
  }
}

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
 * ------------ Customizable flexbox grid ------------ */

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .column {
    flex-basis: 100%;
  }
}

/*
 * ------------ Helper classes ------------ */

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
