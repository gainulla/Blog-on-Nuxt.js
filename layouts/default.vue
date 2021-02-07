<template>
  <Nuxt />
</template>

<style lang="scss">

html {
  box-sizing: border-box;
  --body-bg: #FFF;

  --link: darkslategray;
  --link-visited: palevioletred;
  --link-hover: cadetblue;
  --link-active: darkcyan;
  --primary-font: 'Bellota Text', cursive;
  --secondary-font: 'Inria Serif', serif;
  --bold-font: 'Roboto', sans-serif;
}

*, *::before, *::after {
  box-sizing: inherit;
}

body {
  margin: 0;
  font-family: var(--primary-font);
  background-color: var(--body-bg);
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
  font-weight: 700;
}

.message {
  background-color: #EEE;
  padding: 1rem 1.6rem;
  padding-bottom: 1.5rem;
  border-radius: 1.2rem;
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
  transform: rotate(24deg);
  width: 100px;
  height: 100px;
  background-color: white;
  background-image: linear-gradient(66deg, #F6F6F8 50%, #f0f2f3 50%);
  padding: 20px;

  img {
    width: 60px;
    height: 60px;
  }
  .polygon-rotate {
    transform: rotate(-22.5deg) !important;
  }
}

@media (min-width: 768px) {
  .polygon {
    min-width: 130px;
    min-height: 130px;
    padding: 25px;
    img {
      width: 80px;
      height: 80px;
    }
  }
}

.container {
  margin: 0 auto;
  max-width: 1024px;
  min-width: 320px;
  padding-left: 15px;
  padding-right: 15px;

  .row {
    display: flex;
    flex-wrap: wrap;

    .column {
      text-align: center;
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: 1;
      //background-color: #efefef;
      //border: 1px solid #dedede;
      padding: 0;

      &.col-1 {
        max-width: calc(100% / 12);
      }
      &.col-2 {
        max-width: calc(100% / 12 * 2);
      }
      &.col-3 {
        max-width: calc(100% / 12 * 3);
      }
      &.col-4 {
        max-width: calc(100% / 12 * 4);
      }
      &.col-5 {
        max-width: calc(100% / 12 * 5);
      }
      &.col-6 {
        max-width: calc(100% / 2);
      }
    }
  }
}

@media (max-width: 767px) {
  .container {
    .column {
      min-width: 100%;
      width: 100%;
      margin: 10px 0;
      padding: 10px;
    }
  }
}

@media (min-width: 768px) {
  .container .row  .column {
    &.col-md-1 {
      max-width: calc(100% / 12);
    }
    &.col-md-2 {
      max-width: calc(100% / 12 * 2);
    }
    &.col-md-3 {
      max-width: calc(100% / 12 * 3);
    }
    &.col-md-4 {
      max-width: calc(100% / 12 * 4);
    }
    &.col-md-5 {
      max-width: calc(100% / 12 * 5);
    }
    &.col-md-6 {
      max-width: calc(100% / 2);
    }
  }

  .headline {
    margin-bottom: 3rem;
  }
}

@media (min-width: 992px) {
  .container .row .column {
    &.col-lg-1 {
      max-width: calc(100% / 12);
    }
    &.col-lg-2 {
      max-width: calc(100% / 12 * 2);
    }
    &.col-lg-3 {
      max-width: calc(100% / 12 * 3);
    }
    &.col-lg-4 {
      max-width: calc(100% / 12 * 4);
    }
    &.col-lg-5 {
      max-width: calc(100% / 12 * 5);
    }
    &.col-lg-6 {
      max-width: calc(100% / 2);
    }
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
