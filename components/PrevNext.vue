<template>
  <div class="prev-next-links">
    <div class="inner">

      <NuxtLink v-if="prev"
        :to="{ name: `blog-slug___${$i18n.locale}`, params: { slug: prev.slug } }"
        class="link prev"
      >
        <nav class="nav prev">
          <span class="icon arrow-left" />
          <span class="">Previous</span>
        </nav>
        <span class="thumbnail">
          <img :src="featImg($appendImgSize(prev.image, '_thumb'))" />
        </span>
        <h4 class="title">{{ prev.title }}</h4>
      </NuxtLink>
      <span v-else>&nbsp;</span>
      
      <NuxtLink v-if="next"
        :to="{ name: `blog-slug___${$i18n.locale}`, params: { slug: next.slug } }"
        class="link next"
      >
        <nav class="nav next">
          <span>Next</span>
          <span class="icon arrow-right" />
        </nav>
        <span class="thumbnail">
          <img :src="featImg($appendImgSize(next.image, '_thumb'))" />
        </span>
        <h4 class="title">{{ next.title }}</h4>
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
  width: 100%;
  .inner {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
  }

  .link {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    max-width: 320px;
    min-width: 240px;
    font-family: var(--secondary-font);
    font-weight: 700;
    font-size: 1.2rem;
    text-transform: lowercase;
    color: #000;
    text-transform: capitalize;
    margin: 0 15px;

    nav {
      display: flex;
      align-items: center;
      width: 100%;
      font-family: var(--primary-font);
      &.prev {
        .icon {
          margin-left: -10px;
        }
      }
      &.next {
        justify-content: flex-end;
        .icon {
          margin-right: -10px;
        }
      }
      .icon {
        transform: scale(.5);
      }
    }

    .thumbnail {
      display: block;
      width: 320px;
      height: 190px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .title {
      margin: 1rem 0;
    }
  }
}

@media (min-width: 768px) {
  .prev-next-links {
    margin-top: 1rem;
    .inner {
      justify-content: space-between;
    }
  }
}

</style>