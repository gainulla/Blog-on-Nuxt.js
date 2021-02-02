<template>
  <div>
    <Header>
      <LocaleSwitch slot="locale-switch" />
    </Header>

    <div class="container">
      <PostEditForm />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewPost'

}
</script>