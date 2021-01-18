<template>
  <div>
    <Header />
    <div class="container content-wrapper pt-0">
      <PostEditForm />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewPost',

  data() {
    return {
      message: "",
    }
  }
}
</script>

<style scoped>
.message {
  margin-top: 2rem;
}
</style>