<template>
  <Nuxt />
</template>

<style lang="scss">

html {
  box-sizing: border-box;
  --body-bg: #E9EAEE;
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
  padding-left: 5rem;
  padding-right: 5rem;
  background-color: transparent;
  background-color: #F6F6F4;
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
    color: hsl(206, 6%, 50%);
  }
  &:visited {
     color: rgb(116, 82, 116);
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

</style>
