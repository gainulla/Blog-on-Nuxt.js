<template>
  <div class="pagination">

    <span v-if="currentPage === 1" class="btn btn-left disabled">
      <span class="icon cheveron-left" />
      <span class="icon cheveron-left" style="margin-left: -1.8rem" />
      <span class="text">First</span>
    </span>

    <nuxt-link v-else
      :to="{ name: `blog-page-page___${locale}`, params: { page: 1 } }"
      class="btn btn-left"
    >
      <span class="icon cheveron-left" />
      <span class="icon cheveron-left" style="margin-left: -1.8rem" />
      <span class="text">First</span>
    </nuxt-link>
    
    <span v-if="currentPage === 1" class="btn btn-left disabled">
      <span class="icon cheveron-left" />
      <span class="text">Prev</span>
    </span>

    <nuxt-link v-else
      :to="{ name: `blog-page-page___${locale}`, params: { page: prevPage } }"
      class="btn btn-left"
    >
      <span class="icon cheveron-left" />
      <span class="text">Prev</span>
    </nuxt-link>

    <span v-if="currentPage === totalPages" class="btn btn-right disabled">
      <span class="text">Next</span>
      <span class="icon cheveron-right" />
    </span>

    <nuxt-link v-else
      :to="{ name: `blog-page-page___${locale}`, params: { page: nextPage } }"
      class="btn btn-right"
    >
      <span class="text">Next</span>
      <span class="icon cheveron-right" />
    </nuxt-link>

    <span v-if="currentPage === totalPages" class="btn btn-right disabled">
      <span class="text">Last</span>
      <span class="icon cheveron-right" style="margin-right:-1.8rem" />
      <span class="icon cheveron-right" />
    </span>

    <nuxt-link v-else
      :to="{ name: `blog-page-page___${locale}`, params: { page: totalPages } }"
      class="btn btn-right"
    >
      <span class="text">Last</span>
      <span class="icon cheveron-right" style="margin-right:-1.8rem" />
      <span class="icon cheveron-right" />
    </nuxt-link>

  </div>
</template>

<script>
export default {
  created() {
    console.log('PARAMS PAGE', this.$route.params.page)
    console.log('TOTAL PAGES', this.totalPages)
  },
  props: {
    locale: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 3
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.perPage)
    },
    currentPage() {
      return parseInt(this.$route.params.page) || 1
    },
    prevPage() {
      return this.currentPage > 1 ? this.currentPage - 1 : 1
    },
    nextPage() {
      return this.currentPage < this.totalPages
        ? this.currentPage + 1
        : this.totalPages
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 4rem;
  margin-bottom: 4rem;
  display: flex;
  justify-content: center;

  .btn {
    background-color: #b0c4c0;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;

    .text {
      display: none;
    }
    .icon {
      transform: scale(.8);
      opacity: .7;
    }
    &:hover, &:focus {
      background-color: #c2dbd6;
      color: #000;
    }

    &.disabled {
      background-color: #DDD !important;

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
</style>