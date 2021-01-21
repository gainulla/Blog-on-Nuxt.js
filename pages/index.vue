<template>
  <div>
    <Header />
    <div class="container content-wrapper">
      <h1 class="text-center">{{ $t('headline1.home') }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
.content-wrapper {
  height: 100vh;
}
</style>