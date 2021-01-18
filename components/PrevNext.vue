<template>
  <div class="prev-next-links">
    <div class="inner">
      <NuxtLink
        v-if="prev"
        :to="{ name: 'posts-slug', params: { slug: prev.slug } }"
        class="link prev"
      >
        <span class="icon arrow-left" /><span>{{ prev.title }}</span>
      </NuxtLink>
      <span v-else>&nbsp;</span>
      <NuxtLink
        v-if="next"
        :to="{ name: 'posts-slug', params: { slug: next.slug } }"
        class="link next"
      >
        <span>{{ next.title }}</span><span class="icon arrow-right" />
      </NuxtLink>
      <span v-else>&nbsp;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrevNext',

  props: {
    prev: {
      type: Object,
      default: () => null
    },
    next: {
      type: Object,
      default: () => null
    }
  }
}
</script>

<style lang="scss" scoped>
.prev-next-links {
  margin-right: -2rem;

  .inner {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .link {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    text-transform: lowercase;
    color: #000;
    span::first-letter {
      text-transform: capitalize;
    }
    &.prev {
      margin-right: 2rem;
      padding-right: .5rem;
    }
    &.next {
      padding-left: .5rem;
    }
    .icon {
      transform: scale(.6);
    }
  }
}
</style>