<template>
  <Nuxt />
</template>

<style lang="scss">

html {
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}

body {
  margin: 0;
  font-family: Helvetica, Arial, sans-serif;
  background-color: #F5F5F5;
}

.container {
  max-width: 1024px;
  margin: 0 auto;
}

.content-wrapper {
  padding: 1rem;
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
    color: cadetblue;
  }
  &:visited {
    color: darkcyan;
  }
  &:hover {
    color: darkcyan;
  }
  &:active {
    color: darkcyan;
  }
}

ul {
  margin: 0;
  list-style: none;
}

h1, h2, h3, h4, h5 {
  font-weight: normal;
}

.text-center {
  text-align: center;
}

.pt-0 {
  padding-top: 0 !important;
}
.mt-1 {
  margin-top: 1rem !important;
}
.mt-2 {
  margin-top: 2rem !important;
}
.mb-1 {
  margin-bottom: 1rem !important;
}
.mb-2 {
  margin-bottom: 2rem !important;
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
  text-align: right;
  margin-bottom: 2rem;
  .btn {
    text-transform: uppercase;
    margin-left: .5rem;
    background-color: cornflowerblue;
    color: white;
    padding: .5rem .8rem;
  }
}

</style>
