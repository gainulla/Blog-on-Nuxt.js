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
  transition: color 200ms ease-in;

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

.border-b {
  box-shadow: -1px -1px 12px 6px rgba(darken(#CCB9B1, 50), .05);
  &.border-b--darker {
    box-shadow: -1px -1px 12px 6px rgba(darken(#CCB9B1, 70), .05);
  }
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

.logo {
  position: absolute;
  top: 10%;
  left: 15%;
}

.polygon {
  display: block;
  clip-path: polygon(
    0 28%, 28% 0,
    72% 0, 100% 28%,
    100% 72%, 72% 100%,
    28% 100%, 0 72%
  );
  width: 100px;
  height: 100px;
  background-color: white;
  background-image: linear-gradient(25deg, #F6F6F8 50%, #f0f2f3 50%);
  padding: 20px;

  img {
    width: 60px;
    height: 60px;
  }
}

@media (min-width: 768px) {
  .polygon {
    min-width: 130px;
    min-height: 130px;
    padding: 25px;
    img {
      width: 86px;
      height: 86px;
    }
  }
}

.container {
  margin: 0 auto;
  max-width: 1024px;
  min-width: 320px;
  padding-left: 15px;
  padding-right: 15px;
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
