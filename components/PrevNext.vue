<template>
  <div class="prev-next-links">
    <div class="inner">

      <NuxtLink v-if="prev"
        :to="{ name: `blog-slug___${$i18n.locale}`, params: { slug: prev.slug } }"
        class="link prev"
      >
        <span class="icon arrow-left" /><span>{{ prev.title }}</span>
      </NuxtLink>
      <span v-else>&nbsp;</span>
      
      <NuxtLink v-if="next"
        :to="{ name: `blog-slug___${$i18n.locale}`, params: { slug: next.slug } }"
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
  border-top: 1px solid #EEE;
  margin-top: 2rem;

  .inner {
    position: relative;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
  }

  .link {
    display: flex;
    flex-grow: 1;
    align-items: center;
    font-family: var(--secondary-font);
    font-weight: 700;
    font-size: 1.2rem;
    text-transform: lowercase;
    color: #000;
    padding-top: .5rem;
    text-transform: capitalize;

    &.prev {
      padding-right: 2.5rem;
    }
    &.next {
      padding-left: .5rem;
      justify-content: flex-end;
    }
    .icon {
      transform: scale(.5);
    }
  }
}
</style>