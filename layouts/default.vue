<template>
  <Nuxt />
</template>

<style lang="scss">

html {
  box-sizing: border-box;
  --body-bg: white;

  --link: darkslategray;
  --link-visited: palevioletred;
  --link-hover: cadetblue;
  --link-active: darkcyan;
}

*, *::before, *::after {
  box-sizing: inherit;
}

body {
  margin: 0;
  font-family: Helvetica, Arial, sans-serif;
  background-color: var(--body-bg);
}

.nuxt-wrapper {
  max-width: 1200px;
  height: 100vh;
  margin: 0 auto;
  background-color: white;
  padding-bottom: 5rem;
}

.container {
  max-width: 1160px;
  margin: 0 auto;
}

.content-wrapper {
  padding-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: transparent;
}

.clearfix, button {
  &::before, &::after {
    content: " ";
    display: table;
  }
  &::after {
    clear: both;
  }
}

a {
  font-family: Helvetica, Arial, sans-serif;
  line-height: 1.5;
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
  list-style: none;
}

h1, h2, h3, h4, h5 {
  font-weight: normal;
}

ul {
  padding: 0;
}

.text-center {
  text-align: center;
}

.pt-0 {
  padding-top: 0 !important;
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
    background-size: 36px;
  }
  &.arrow-right {
    background-image: url('~assets/svg/icon-arrow-right.svg');
    background-size: 36px;
  }
}

.admin-area {
  margin-bottom: 2rem;
  border-bottom: 1px solid #e9e9e6;
  padding-bottom: .5rem;
  display: flex;
  justify-content: flex-end;

  .btn {
    text-transform: uppercase;
    margin-left: .2rem;
    background-color: rgb(175, 177, 182);
    color: white;
    padding: .5rem .8rem;
  }
}

hr.wide-border {
  height: 10px;
  border: 0;
  box-shadow: inset 0 15px 15px -12px rgba(37, 16, 16, 0.14);
  margin-top: 4rem;
  margin-bottom: 0;
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
  background-image: linear-gradient(66deg, #F8F8F8 50%, #F2F2F2 50%);
  padding: 1rem 1rem .6rem .6rem;

  img {
    width: 80px;
    height: 72px;
  }
  .polygon-rotate {
    transform: rotate(-22.5deg) !important;
  }
}

@media (min-width: 576px) {
  .polygon {
    min-width: 130px;
    min-height: 130px;
    img {
      width: 108px;
      height: 98px;
    }
  }
}
</style>
