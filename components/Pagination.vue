<template>
  <div class="pagination">
    <span v-if="currentPage === 1" class="btn btn-left disabled">
      <span class="icon icon__cheveron-left" />
      <span class="icon icon__cheveron-left" style="margin-left: -1.8rem" />
      <span class="text">{{ $t('first') }}</span>
    </span>

    <nuxt-link
      v-else
      :to="{ name: `blog-page-page___${$i18n.locale}`, params: { page: 1 } }"
      class="btn btn-left"
    >
      <span class="icon icon__cheveron-left" />
      <span class="icon icon__cheveron-left" style="margin-left: -1.8rem" />
      <span class="text">{{ $t('first') }}</span>
    </nuxt-link>

    <span v-if="currentPage === 1" class="btn btn-left disabled">
      <span class="icon icon__cheveron-left" />
      <span class="text">{{ $t('prev') }}</span>
    </span>

    <nuxt-link
      v-else
      :to="{ name: `blog-page-page___${$i18n.locale}`, params: { page: prevPage } }"
      class="btn btn-left"
    >
      <span class="icon icon__cheveron-left" />
      <span class="text">{{ $t('prev') }}</span>
    </nuxt-link>

    <span v-if="currentPage === totalPages" class="btn btn-right disabled">
      <span class="text">{{ $t('next') }}</span>
      <span class="icon icon__cheveron-right" />
    </span>

    <nuxt-link
      v-else
      :to="{ name: `blog-page-page___${$i18n.locale}`, params: { page: nextPage } }"
      class="btn btn-right"
    >
      <span class="text">{{ $t('next') }}</span>
      <span class="icon icon__cheveron-right" />
    </nuxt-link>

    <span v-if="currentPage === totalPages" class="btn btn-right disabled">
      <span class="text">{{ $t('last') }}</span>
      <span class="icon icon__cheveron-right" style="margin-right:-1.8rem" />
      <span class="icon icon__cheveron-right" />
    </span>

    <nuxt-link
      v-else
      :to="{ name: `blog-page-page___${$i18n.locale}`, params: { page: totalPages } }"
      class="btn btn-right"
    >
      <span class="text">{{ $t('last') }}</span>
      <span class="icon icon__cheveron-right" style="margin-right:-1.8rem" />
      <span class="icon icon__cheveron-right" />
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.total / this.perPage)
    },
    currentPage () {
      return parseInt(this.$route.params.page) || 1
    },
    prevPage () {
      return this.currentPage > 1 ? this.currentPage - 1 : 1
    },
    nextPage () {
      return this.currentPage < this.totalPages
        ? this.currentPage + 1
        : this.totalPages
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;

  .btn {
    border: 1px solid #b0c4c0;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    font-family: var(--primary-font);

    .text {
      display: none;
    }
    .icon {
      transform: scale(.8);
      opacity: .7;
    }
    &:hover, &:focus {
      background-color: darken(#c2dbd6, 30);
      color: #FFF;
    }

    &.disabled {
      border: #DDD !important;
      background-color: #DDD !important;
      color: initial !important;

      .text {
        opacity: .7;
      }
      .icon {
        opacity: .4;
      }
    }
  }

  *.btn + * {
    margin-left: 1rem;
  }
}

@media (min-width: 576px) {
  .pagination {
    margin-top: 3rem;

    .btn {
      .text {
        display: block;
        text-transform: uppercase;
      }
      &.btn-right {
        text-align: center;
        padding-left: 1rem;
      }
      &.btn-left {
        text-align: center;
        padding-right: 1rem;
      }
    }
    *.btn + * {
      margin-left: 1.5rem;
    }
  }
}

@media (min-width: 768px) {
  .pagination {
    margin-top: 4rem;
  }
}
</style>
